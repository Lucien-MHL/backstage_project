import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { selectIsDark } from '../features/switch/switchSlice'
import {
  selectUserPageState,
  selectUserPlusState,
  userFormMenuOpen,
  handleChangePhoto,
  changeOption,
  userPutStart,
  userPutWithAzureStart
} from '../features/group/groupSlice'

const Form = styled.form`
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${({ gap }) => gap + 'rem'};
`
const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  cursor: progress;
`
const SaveIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
  pointer-events: none;
`
const Name = styled.label`
  display: flex;
  align-items: center;
  width: 72%;
  height: 45px;
  border-bottom: 1.5px solid ${({ theme }) => theme.secondary};

  ::before {
    content: '\f2bb';
    font: var(--fa-font-solid);
    width: 15%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.55rem;
  }
`
const Account = styled(Name)`
  ::before {
    content: '\f007';
  }
`
const Password = styled(Name)`
  margin-top: 5rem;
  ::before {
    content: '\f023';
  }
`
const Email = styled(Name)`
  ::before {
    content: '\f0e0';
  }
`
const Input = styled.input`
  width: 85%;
  height: 100%;
  color: ${({ theme }) => theme.secondary};
  background-color: transparent;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.15rem;
  border: none;
  padding: 0.5rem 1rem;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.secondary + '5a'};
    font-weight: 600;
    letter-spacing: normal;
  }

  :focus ::placeholder {
    color: ${({ theme }) => theme.secondary};
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.secondary};
    transition: background-color 5000s ease-in-out 0s;
  }

  &::-ms-reveal {
    filter: ${(props) => (props.isDark ? 'invert(100%)' : 'invert(0%)')};
  }
`
const Placeholder = styled.p`
  color: ${({ theme }) => theme.secondary + '5a'};
`
const Button = styled.button`
  width: 40%;
  background-color: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 25px;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryActive};
  }
`
const Select = styled.label`
  position: relative;
  width: 260px;
  height: 45px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.secondary};
  border: 1.5px solid ${({ theme }) => theme.secondary};
  border-radius: 25px;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  line-height: 45px;

  ::after {
    display: block;
    content: '\f0d7';
    font: var(--fa-font-solid);
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.75rem;
    font-size: 1.25rem;
    pointer-events: none;
  }

  > input {
    display: none;
  }
`
const Optgroup = styled.ul`
  position: relative;
  /* bottom: 2rem; */
  z-index: 99;
  width: 100%;
  display: ${(props) => (props.menuName === props.activeName ? 'flex' : 'none')};
  /* opacity: 0; */
  flex-direction: column;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.secondary};
  font-weight: 600;
  font-size: 1.15rem;
  text-align: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  margin-top: 0.75rem;
  border-radius: 15px;
`
const Option = styled.li`
  padding: 0.5rem;

  :hover {
    background-color: ${({ theme }) => theme.primary + '5f'};
  }
`
const SettingButton = styled(Button)`
  margin-top: 2rem;
`
const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
`
const Side = styled.aside`
  width: 45%;
`
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 1rem;
`
const Figure = styled.figure`
  position: relative;
  width: 100%;

  ::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background-color: #000;
    opacity: 0;
    z-index: 1;
    /* transition: opacity 0.3s; */
  }

  :hover::after {
    opacity: 0.67;
    transition: opacity 0.3s;
  }

  :hover > label {
    opacity: 1;
    transition: opacity 0.4s 0.2s;
  }
`
const Upload = styled.label`
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: max-content;
  height: max-content;
  margin: auto;
  font-size: 2.5rem;
  font-weight: 600;
  color: #aaa;
  cursor: pointer;
  z-index: 2;

  :hover {
    color: #fff;
  }

  > input {
    display: none;
  }
`
const UploadIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
`
const Photo = styled.img`
  display: block;
  width: 100%;
  height: 190px;
  object-fit: contain;
  border: 1.5px solid ${({ theme }) => theme.secondary};
  border-radius: 25px;
  background-color: #fff;
  pointer-events: none;
`

const FormLayout = ({ children, gap }) => {
  const formData = useRef()
  const dispatch = useDispatch()
  const { isLoading, user, active } = useSelector(selectUserPageState)

  function handleSubmit(e) {
    e.preventDefault()
    const dispatchMode =
      active !== 3
        ? userPutStart({ user, formData })
        : userPutWithAzureStart({ user, formData })
    dispatch(dispatchMode)
  }

  return (
    <Form onSubmit={handleSubmit} ref={formData} gap={gap}>
      {isLoading && <Cover />}
      {children}
    </Form>
  )
}

// 個人資料組件
function BasicInfo() {
  const { user, isLoading } = useSelector(selectUserPageState)
  return (
    <FormLayout gap={3}>
      <Name>
        <Input
          name='name'
          type='text'
          placeholder='名稱'
          defaultValue={user?.name}
          required
        />
      </Name>
      <Account>
        <Input
          name='account'
          type='text'
          placeholder='帳號'
          defaultValue={user?.account}
          required
        />
      </Account>
      <Email>
        <Input
          name='email'
          type='email'
          placeholder='信箱'
          defaultValue={user?.email}
          required
        />
      </Email>
      <Button type='submit' disabled={isLoading}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} pulse />
        ) : (
          <>
            <SaveIcon icon={faFloppyDisk} />
            儲存
          </>
        )}
      </Button>
    </FormLayout>
  )
}

// 基本設定組件
function BasicSetting() {
  const dispatch = useDispatch()
  const { env, action } = useSelector(selectUserPlusState)
  const { isLoading, dropMenu } = useSelector(selectUserPageState)

  return (
    <FormLayout gap={1.5}>
      {env.map((e) => (
        <Select
          key={e.name}
          htmlFor={e.name}
          onClick={() => dispatch(userFormMenuOpen(e.name))}
        >
          {dropMenu[e.name]?.name ?? <Placeholder>{e.placeholder}</Placeholder>}
          <Input name={e.name} defaultValue={dropMenu[e.name]?.value} readOnly />
          <Optgroup menuName={e.name} activeName={action}>
            {e.option.map((item) => (
              <Option
                key={item.name}
                onClick={() => dispatch(changeOption({ [e.name]: item }))}
              >
                {item.name}
              </Option>
            ))}
          </Optgroup>
        </Select>
      ))}
      <SettingButton type='submit' disabled={isLoading}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} pulse />
        ) : (
          <>
            <SaveIcon icon={faFloppyDisk} />
            儲存
          </>
        )}
      </SettingButton>
    </FormLayout>
  )
}

// 重設密碼組件
function PasswordReset() {
  const isDark = useSelector(selectIsDark)
  const { isLoading } = useSelector(selectUserPageState)
  return (
    <FormLayout gap={5}>
      <Password>
        <Input
          required
          placeholder='輸入新的密碼'
          type='password'
          name='password'
          isDark={isDark}
        />
      </Password>
      <Button type='submit'>
        {isLoading ? <FontAwesomeIcon icon={faSpinner} pulse /> : '確認送出'}
      </Button>
      {/* {msg && <MessageBox>{msg}</MessageBox>} */}
    </FormLayout>
  )
}

// 個人圖片設定組件
function Photos() {
  const dispatch = useDispatch()
  const { isLoading, photos } = useSelector(selectUserPageState)
  return (
    <FormLayout gap={3.5}>
      <Section>
        {photos.map((item) => (
          <Side key={item.key}>
            <Title>{item.name}</Title>
            <Figure>
              <Photo src={item.src} alt={item.key} />
              <Upload htmlFor={item.key}>
                <UploadIcon icon={faRotateRight} />
                變更圖片
                <Input
                  id={item.key}
                  type='file'
                  name={item.key}
                  accept='image/*'
                  onChange={(e) => dispatch(handleChangePhoto(e.target))}
                />
              </Upload>
            </Figure>
          </Side>
        ))}
      </Section>
      <Button type='submit' disabled={isLoading}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} pulse />
        ) : (
          <>
            <SaveIcon icon={faFloppyDisk} />
            儲存
          </>
        )}
      </Button>
    </FormLayout>
  )
}

// 歷史紀錄組件
function History() {
  return (
    <FormLayout>
      <Title>敬請期待 ...</Title>
    </FormLayout>
  )
}

const UserComponent = [
  <BasicInfo />,
  <BasicSetting />,
  <PasswordReset />,
  <Photos />,
  <History />
]

export default UserComponent
