{"filter":false,"title":"main1.js","tooltip":"/router/main1.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":232,"column":0},"action":"insert","lines":["var querystring = require('querystring');","var utf8 = require('utf8');","var uuid = require('uuid-v4');","","module.exports = function(app,fs)","{","  /*","    var messageData = \" \";","","    //사용자의 메세지를 JSON으로 bot builder에게 전송","    function readJSONResponse(res) {","    var responseData = '';","","    res.on('data', function (chunk) {","      responseData += chunk;","    });","    res.on('end', function () {","      var dataObj = JSON.parse(responseData);","      console.log(\"Raw Response: \" +responseData);","      console.log(\"output: \" + dataObj.output.visit_nodes_text);","","      messageData = JSON.stringify(dataObj.output.visit_nodes_text);","      console.log(messageData);","    });","  }","  */","  //키보드","  app.get('/keyboard', function(req, res){","        fs.readFile( \"./data/\" + \"keyboard.json\", 'utf8', function (err, data) {","           console.log(data);","           res.end(data);","         });","      });","    // 메시지"," app.post('/message', function(req, res){","   var result = {  };","   var story_id = \"5926ba7065d440554f015b39\";","   var url = 'http://mindmap.ai:8000/v1/' + story_id + '/';","   var new_context = { };","","   // CHECK REQ VALIDITY/","   if(!req.body[\"user_key\"] || !req.body[\"type\"] || !req.body[\"content\"]){","     result[\"success\"] = 0;","     result[\"error\"] = \"invalid request\";","     res.json(result);","     return;","   }","   //\"사용법\"\" 이거나 \"고고\"\"이면 그에 따른 message를 전송하고 아닐 경우 이해 못함 전송","   if (req.body[\"content\"] == \"사용법\" || req.body[\"content\"] == \"고고\") {","     fs.readFile(\"./data/\" + \"message.json\", 'utf8', function(err, data) {","       var messages = JSON.parse(data);","       console.log(data);","","       if (req.body[\"content\"] == \"사용법\") {","         var inputtxtinit = \"사용법\";","         var inputJsonObjectDataInit = {","           \"story_id\": story_id,","           \"context\": {","             \"conversation_id\": uuid(),","             \"random\": false,","             \"visit_counter\": 0,","             \"reprompt\": false,","             \"information\": {","               \"user_request_counter\": 1,","               \"conversation_stack\": [","                 {","                   \"conversation_node_name\": \"루트노드\",","                   \"conversation_node\": \"root\"","                 }","               ],","               \"conversation_counter\": 1","             },","             \"retrieve_field\": false,","             \"message\": null,","             \"input_field\": null,","             \"variables\": null,","             \"keyboard\": {","               \"buttons\": [","                 \"사용법\",","                 \"고고\"","               ],","               \"type\": \"buttons\"","             }","           },","           \"input\": {","             \"text\": inputtxtinit","           }","         };","         var json = '';","         request({","           url: url,","           method: 'POST',","           json: inputJsonObjectDataInit","         },","         // response 받기","         function(error, response, body){","           console.log(\"--------- response된 payload json 시작 ----------\");","           console.log(body);","           console.log(\"--------- response된 payload json 끝 ----------\");","           console.log(\"\");","           json = body;","","           // 받은 텍스트보기","           var outputTextArray = json[\"output\"][\"visit_nodes_text\"];","           console.log(\"outputTextArray: \" + outputTextArray.toString());","           for(var i=0 ; i < outputTextArray.length ; i++){","             //실행된 모든 노드의 대답을 표시한다","             console.log(outputTextArray[i]);","           }","           messages[\"message\"] = {\"text\" : outputTextArray.toString()};","       })","     }","       else if (req.body[\"content\"] == \"고고\") {","         var inputtxtinit = \"고고\";","         var inputJsonObjectDataInit = {","           \"story_id\": story_id,","           \"context\": {","             \"conversation_id\": uuid(),","             \"random\": false,","             \"visit_counter\": 0,","             \"reprompt\": false,","             \"information\": {","               \"user_request_counter\": 1,","               \"conversation_stack\": [","                 {","                   \"conversation_node_name\": \"루트노드\",","                   \"conversation_node\": \"root\"","                 }","               ],","               \"conversation_counter\": 1","             },","             \"retrieve_field\": false,","             \"message\": null,","             \"input_field\": null,","             \"variables\": null,","             \"keyboard\": {","               \"buttons\": [","                 \"사용법\",","                 \"고고\"","               ],","               \"type\": \"buttons\"","             }","           },","           \"input\": {","             \"text\": inputtxtinit","           }","         };","         var json = '';","         request({","           url: url,","           method: 'POST',","           json: inputJsonObjectDataInit","         },","         // response 받기","         function(error, response, body){","           console.log(\"--------- response된 payload json 시작 ----------\");","           console.log(body);","           console.log(\"--------- response된 payload json 끝 ----------\");","           console.log(\"\");","           json = body;","","           // 받은 텍스트보기","           var outputTextArray = json[\"output\"][\"visit_nodes_text\"];","           console.log(\"outputTextArray: \" + outputTextArray.toString());","           for(var i=0 ; i < outputTextArray.length ; i++){","             //실행된 모든 노드의 대답을 표시한다","             console.log(outputTextArray[i]);","           }","           messages[\"message\"] = {\"text\" : outputTextArray.toString()};","           new_context = json['context'];","         });","       }","       fs.writeFile(\"./data/message.json\", JSON.stringify(messages, null, '\\t'), \"utf8\", function(err, data) {","         if (err) {","           console.log(err);","         }","       })","       fs.readFile(\"./data/message.json\", 'utf8', function(err, data) {","          console.log(data);","          res.end(data);","          return;","        })","      })","    }","    else{","      fs.readFile(\"./data/\" + \"message.json\", 'utf8', function(err, data) {","        var messages = JSON.parse(data);","        console.log(data);","      var inputtxtinit = req.body[\"content\"];","      var new_inputJsonObjectData = {","        \"story_id\": story_id,","        \"context\": new_context,","        \"input\": {","          \"text\": new_inputtxt","        }","      };","      // request 보내기","      var json = '';","      request({","        url: url,","        method: 'POST',","        json: new_inputJsonObjectDataInit","      },","      // response 받기","      function(error, response, body){","        console.log(body);","        console.log(\"\");","        json = body;","        // 받은 텍스트보기","        var outputTextArray = json[\"output\"][\"visit_nodes_text\"];","        console.log(\"outputTextArray: \" + outputTextArray.toString());","        for(var i=0 ; i < outputTextArray.length ; i++){","          //실행된 모든 노드의 대답을 표시한다","          console.log(outputTextArray[i]);","        }","        new_context = json['context'];","        messages[\"message\"] = {\"text\" : outputTextArray.toString()};","      })","      fs.writeFile(\"./data/message.json\", JSON.stringify(messages, null, '\\t'), \"utf8\", function(err, data) {","        if (err) {","          console.log(err);","        }","      })","      fs.readFile(\"./data/message.json\", 'utf8', function(err, data) {","         console.log(data);","         res.end(data);","         return;","       })","     })","   }"," }","}",""],"id":1}]]},"ace":{"folds":[],"scrolltop":3300.5,"scrollleft":0,"selection":{"start":{"row":221,"column":9},"end":{"row":221,"column":9},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":205,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1496727145042,"hash":"3e9e97fefbd2d269e7c1ad93bc94a6df1d9af19a"}