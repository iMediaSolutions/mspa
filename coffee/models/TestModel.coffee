define ['models/BaseModel'], (BaseModel)->
  class TestModel extends BaseModel
    easyRoute: ->
      console.log('it worked!')
    route: ->
      console.log('in route')
