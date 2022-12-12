import { createServer, Model, Response, Factory, hasMany, belongsTo } from 'miragejs'
import { Buffer } from 'buffer'
import { faker } from '@faker-js/faker'
import { nameList } from '../fakeLists/managersList'
import { groupList } from '../fakeLists/groupList'
import {
  stationList,
  cityList,
  countryList,
  situationList,
  progressDemo,
  dataSourceList,
  applyList,
  typeList,
  currencyList
} from '../fakeLists/stationList'

// 隨機正整數範圍產生器
function randomNumber(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed())
}

// 處理 HTTP "GET" METHOD 的固定程式碼
const checkIdentify = (schema, request) => {
  const {
    requestHeaders: { Authorization }
  } = request
  const account = Buffer.from(Authorization.split(' ')[1], 'base64')
    .toString('utf8')
    .split('/')[0]
  const isVerify = schema.managers.findBy({ account })

  return isVerify ? true : false
}

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      manager: Model,
      group: Model.extend({
        users: hasMany()
        // stations: hasMany()
      }),
      user: Model.extend({
        group: belongsTo()
      }),
      station: Model
    },

    factories: {
      manager: Factory.extend({
        account: (i) => `${nameList[i - 1]}_dsegom`,
        password: '123',
        token: (i) =>
          Buffer.from(`${nameList[i - 1]}_dsegom/admin`, 'utf8').toString('base64'),
        email: (i) => `${nameList[i - 1]}@dsegom.com`,
        name: (i) =>
          `${nameList[i - 1].charAt(0).toUpperCase() + nameList[i - 1].slice(1)}`
      }),

      group: Factory.extend({
        name: (i) => groupList[i].name,
        photo: (i) => groupList[i].photo,
        afterCreate(group, server) {
          server.createList('user', 10, { group, logo: group.photo })
        }
      }),

      user: Factory.extend({
        name: () => {
          faker.setLocale('zh_TW')
          const firstName = faker.name.firstName()
          const name = faker.name.fullName()
          return name.split(' ')[1] + firstName
        },
        account: () => faker.internet.password(16, false, /[A-Za-z0-9]/),
        password: () => faker.internet.password(16, false, /[A-Za-z0-9]/),
        email: () => {
          faker.setLocale('en')
          return faker.internet.email()
        },
        notice: () => faker.datatype.boolean().toString(),
        price: () => faker.datatype.boolean().toString(),
        language: () => 'TW',
        identity: (i) => {
          return i === randomNumber(1, 10) ? 'leader' : 'member'
        },
        bgImg: () =>
          'https://dsegomspoc.azurewebsites.net/public/img/system-default-background.jpg'
      }),

      station: Factory.extend({
        id: (i) => stationList[i].ZoneID,
        name: (i) => stationList[i].TWName,
        photo: (i) => stationList[i].PSPhotoFileName,
        wattage: (i) => stationList[i].DCC,
        uptime: (i) => stationList[i].OnlineDate,
        country: (i) => {
          const obj = countryList.find(({ key }) => key === stationList[i].Country)
          return { id: obj?.id, name: obj?.name }
        },
        location: (i) => {
          const obj = cityList[stationList[i].City - 1]
          return obj ? obj.Value : stationList[i].City
        },
        address: (i) => stationList[i].Address,
        lat: (i) => stationList[i].LAT,
        lon: (i) => stationList[i].LGT,
        situation: (i) => {
          const obj = situationList.find(
            ({ Key }) => Key === stationList[i].Disabled
          )
          return { id: obj?.Key, name: obj?.Value }
        },
        progress: (i) => {
          const obj = progressDemo.find(
            ({ Key }) => Key === stationList[i].StationCate
          )
          return { id: obj?.Key, name: obj?.Value }
        },
        releaseDate: (i) => stationList[i].OnlineDate,
        tuv: (i) => stationList[i].TUVID,
        dataCode: (i) => stationList[i].InterFaceID,
        dataSource: (i) => {
          const obj = dataSourceList.find(
            ({ Key }) => Key === stationList[i].InterFaceCode
          )
          return { id: obj?.Key, name: obj?.Value }
        },
        apply: (i) => {
          const obj = applyList.find(({ Key }) => Key === stationList[i].Cate)
          return { id: obj?.Key, name: obj?.Value }
        },
        rate: (i) => stationList[i].RATE,
        type: (i) => {
          const obj = typeList.find(({ Key }) => Key === stationList[i].FieldType)
          return { id: obj.Key, name: obj.Value }
        },
        cod: (i) => stationList[i].COD,
        currency: (i) =>
          !stationList[i].Currency
            ? stationList[i].Currency
            : currencyList.find(({ Key }) => Key === stationList[i].Currency)?.Value,
        notice: (i) => stationList[i].is_EmailServiceOn,
        createdAt: (i) => stationList[i].CreateTime,
        creator: (i) => stationList[i].CreateUser,
        editedAt: (i) => stationList[i].UpdateTime,
        editor: (i) => stationList[i].UpdateUser
      })
    },

    seeds(server) {
      // Schema of Managers
      server.create('manager', {
        name: 'Lucien',
        account: 'lucien_dsegom',
        email: 'lucien.lin@dsegom.com',
        password: '123',
        token: Buffer.from('lucien_dsegom/admin', 'utf8').toString('base64')
      })
      server.createList('manager', nameList.length)

      // Schema of Group
      server.createList('group', groupList.length)

      //Schema of Station
      server.createList('station', stationList.length)
    },

    routes() {
      this.namespace = 'api'

      this.get('/', (schema, request) => {
        try {
          const isVerify = checkIdentify(schema, request)
          if (isVerify) {
            return {
              success: true,
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.get('/managers', (schema, request) => {
        try {
          const isVerify = checkIdentify(schema, request)
          if (isVerify) {
            return {
              success: true,
              result: schema.managers.all().models,
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.get('/managers/:mid', (schema, request) => {
        try {
          const { mid } = request.params
          const isVerify = checkIdentify(schema, request)
          if (isVerify) {
            const manager = schema.managers.find(mid)
            return {
              success: true,
              result: manager,
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.get('/group', (schema, request) => {
        try {
          const isVerify = checkIdentify(schema, request)
          if (isVerify) {
            return {
              success: true,
              result: schema.groups.all().models,
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.get('/group/:gid', (schema, request) => {
        try {
          const { gid } = request.params
          const isVerify = checkIdentify(schema, request)
          if (isVerify) {
            const group = schema.groups.find(gid)
            return {
              success: true,
              result: { group, users: group.users.models },
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.get('/group/:gid/:uid', (schema, request) => {
        try {
          const { gid, uid } = request.params
          const isVerify = checkIdentify(schema, request)
          if (isVerify) {
            const group = schema.groups.find(gid)
            return {
              success: true,
              result: {
                group,
                users: group.users.filter((item) => item.attrs.id === uid).models[0]
              },
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.get('/station', (schema, request) => {
        try {
          const isVerify = checkIdentify(schema, request)
          const groups = schema.groups.all().models
          const stations = schema.stations.all().models
          if (isVerify) {
            return {
              success: true,
              result: {
                groups: groups.map(({ name, id }) => ({ name, id })),
                stations: stations.map(({ name, id, location }) => ({
                  name,
                  id,
                  location
                }))
              },
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.get('/station/:sid', (schema, request) => {
        try {
          const { sid } = request.params
          if (checkIdentify(schema, request)) {
            const station = schema.stations.find(sid)
            return {
              success: true,
              result: station,
              message: ''
            }
          } else {
            return new Response(401, {}, { success: false, message: '身分驗證有誤' })
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.post('/login', (schema, request) => {
        const {
          requestBody: { account, password }
        } = request
        const manager = schema.managers.findBy({ account, password })

        if (manager) {
          return {
            success: true,
            message: '成功',
            token: manager.token
          }
        } else {
          return new Response(
            400,
            {},
            {
              success: false,
              message: '「帳號」或「密碼」輸入錯誤 ! ! !'
            }
          )
        }
      })

      this.post('/forget', (schema, request) => {
        const {
          requestBody: { account, email }
        } = request
        const manager = schema.managers.findBy({ account, email })
        if (manager) {
          return {
            success: true,
            message: `信件已寄送請查看「${email}」收件匣`
          }
        } else {
          return new Response(
            400,
            {},
            {
              success: false,
              message: '「帳號」或「信箱」輸入錯誤 ! ! !'
            }
          )
        }
      })

      this.post('/managers', (schema, request) => {
        try {
          const attrs = JSON.parse(request.requestBody)
          attrs.password = '123'
          attrs.token = Buffer.from(`${attrs.account}/admin`, 'utf8').toString(
            'base64'
          )

          return {
            success: true,
            message: '',
            result: schema.managers.create(attrs)
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.post('/group', (schema, request) => {
        this.timing = 1000
        try {
          const attrs = JSON.parse(request.requestBody)

          if (!attrs.photo.length) {
            attrs.photo =
              'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png'
          }

          return {
            success: true,
            message: '',
            // 創建一個 group 需要 { name, photo } 兩個屬性
            // 其中 name 是使用者必填項目
            // 其中 photo 是 optional，但儲存前要給予預設值
            result: schema.groups.create(attrs)
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.post('/group/:gid', (schema, request) => {
        try {
          const {
            requestBody,
            params: { gid }
          } = request
          let attrs = JSON.parse(requestBody)
          attrs = {
            ...attrs,
            groupId: gid,
            logo: schema.groups.find(gid).photo,
            bgImg:
              'https://dsegomspoc.azurewebsites.net/public/img/system-default-background.jpg'
          }

          return {
            success: true,
            message: '',
            result: schema.users.create(attrs)
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.post('/station', (schema, request) => {
        try {
          const { requestBody } = request
          let attrs = JSON.parse(requestBody)

          return {
            success: true,
            message: '',
            result: schema.stations.create(attrs)
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      // 模擬 Azure 雲端服務資料庫
      this.post('/Azure_Cloud/photos/:genre', (schema, request) => {
        try {
          this.timing = 1000
          const {
            requestBody,
            params: { genre }
          } = request
          return {
            success: true,
            photoURL: URL.createObjectURL(requestBody.get(genre))
          }
        } catch (error) {
          console.log(error.message)
          return { success: false, message: error.message }
        }
      })

      this.put('/managers/:mid', (schema, request) => {
        try {
          const {
            params: { mid },
            requestBody
          } = request

          const attrs = JSON.parse(requestBody)
          if (attrs.account) {
            attrs.token = Buffer.from(`${attrs.account}/admin`, 'utf8').toString(
              'base64'
            )
          }

          const manager = schema.managers.find(mid).update(attrs)

          return {
            success: true,
            token: manager.attrs.token,
            result: manager.attrs,
            message: ''
          }
        } catch (error) {
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.put('/group/:gid', (schema, request) => {
        try {
          const {
            params: { gid },
            requestBody
          } = request
          const attrs = JSON.parse(requestBody)
          const group = schema.groups.find(gid)
          const { photo, userIds } = group
          userIds.forEach((item) => {
            let user = schema.users.find(item)
            if (user.logo === photo) {
              schema.users.find(item).update({ logo: attrs.photo })
            }

            return
          })

          return {
            success: true,
            result: {
              group: schema.groups.find(gid).update(attrs),
              users: schema.groups.find(gid).users.models
            },
            message: ''
          }
        } catch (error) {
          console.log(error.message)
          return new Response(400, {}, { success: false, message: error.message })
        }
      })

      this.put('/group/:gid/:uid', (schema, request) => {
        try {
          const {
            params: { gid, uid },
            requestBody
          } = request
          const attrs = JSON.parse(requestBody)

          return {
            success: true,
            result: schema.users.find(uid).update(attrs),
            message: ''
          }
        } catch (error) {
          console.log(error.message)
          return new Response(400, {}, { success: false, message: error.message })
        }
      })
    }
  })

  return server
}
