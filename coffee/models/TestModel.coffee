define ['models/BaseModel'], (BaseModel)->
  class TestModel extends BaseModel
    easyRoute: ->
      console.log('it worked!')
    route: (id, url, title, actions)->
      console.log('in route')
      console.log(actions)
