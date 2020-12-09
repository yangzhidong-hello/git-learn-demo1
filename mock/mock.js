Mock.mock("http://www.douyu.com","get",{
    // 20条数据
    "data|3": [{
      // 商品种类
      "goodsClass": "女装",
      // 商品Id
      "goodsId|+1": 1,
      //商品名称
      "goodsName": "@ctitle(10)",
      //商品地址
      "goodsAddress": "@county(true)",
      //商品等级评价★
      "goodsStar|1-5": "★",
      //商品图片
      "goodsImg": "@Image('100x100','@color','小甜甜')",
      //商品售价
      "goodsSale|30-500": 30,
  
      // 邮箱：
      "email": "@email",
      // 颜色
      "color": "@color",
  
      // name
      "name": "@name",
  
      //img,参数1：背景色，参2：前景色，参3：图片的格式，默认png，参4：图片上的文字
  
      "img": "@image('100*100','@color')",
      
  
      //中国大区
      "cregion":"@region",
      // 省
      "cprovince":"@province",
      //市
      "ccity":"@city",
      //省 + 市
      "ss":"@city(true)",
      //县
      "country":"@county",
      //省市县
      "countrysx":"@county(true)",
      //邮政编码
      "code":"@zip"
  
    }]
  })
  