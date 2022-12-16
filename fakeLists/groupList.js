const imgArr = [
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group2.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group3.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group4.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group5.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group6.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group7.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group8.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group9.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group10.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group11.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group13.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group14.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group15.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group16.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group19.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220331T152830-group22.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220401T095330-group23.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220420T100730-group24.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220503T160207-group25.jpg',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png',
  'https://frontendstaticfile.blob.core.windows.net/companylogo/20220407T151930-group1.png'
]

const nameList = [
  '鼎日能源科技股份有限公司',
  '京承能源(股)公司',
  '台灣穗高科技(股)公司',
  '晶元綠能',
  '亞電控股股份有限公司',
  '雲豹能源科技',
  'VITEC ENESTA TAIWAN',
  'SUNSEAP',
  '飛躍開發股份有限公司',
  '淞英能源開發有限公司',
  '中華電信',
  '測試群組1122211',
  '日益能源科技股份有限公司',
  '貝爾威勒電子股份有限公司',
  '金元福包裝企業股份有限公司',
  '齊威能源股份有限公司',
  '協力廠商',
  '辰亞能源股份有限公司',
  '系統管理',
  '開元佳能股份有限公司',
  '日安能源股份有限公司',
  '三陸開發',
  '大江生醫S5/S9',
  '國泰電業股份有限公司',
  '全日光有限公司',
  '尚億新能源有限公司',
  '睿亞投資開發有限公司',
  '康維進出口股份有限公司',
  '經濟部標準檢驗局',
  '鼎日能源維運管理部',
  '鼎日能源業主',
  '金陽機電工程有限公司'
]

export const groupList = nameList.map((el, i) => ({ name: el, photo: imgArr[i] }))
