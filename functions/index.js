const functions = require('firebase-functions');
const cors = require('cors')({origin:true});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async(req,res)=>{
    const original = req.query.text;
    const snapshot = await admin.database().ref("/messages").push({original:original});
    
    res.redirect(303, snapshot.ref.toString());
});

exports.reportVideoError = functions.https.onRequest(async(req,res)=>{
    const url = req.query.text;
    const title = req.query.title;
    const snapshot = await admin.database().ref("/errors").push({url: url, title:title});
    cors(req,res,()=>{
        //res.redirect(303, snapshot.ref.toString());
        res.status(200).send({message: "Success"});
    });
    
});

exports.getRandom = functions.https.onRequest((req,res)=>{
    let list = getList(req.query.id);
    var randomNumber = list[Math.floor(Math.random() * list.length)];
    //res.status(200).send({test: random});
    cors(req,res,()=>{
        res.status(200).send({result:randomNumber, req:req.query.id});
    });
});

exports.helloWorld = functions.https.onRequest((req, res) => {
    res.status(200).send('Hello, World!');
});

exports.getRequestTest = functions.https.onRequest((req, res)=>{
    cors(req, res, ()=>{
        res.status(200).send(req);
    })
})

// firebase.cmd deploy --only functions
function getList(id){
    
    let list = [1371,1370,1369,1368,1367,1365,1364,1363,1362,1361,1360,
        1359,1358,1355,1354,1353,1352,1351,1349,1348,1340,1337,1336,1332,1329,1328,1327,1323,1318,1317,1316,1310,1309,
        1303,1302,1301,1300,1299,1298,1297,1294,1288,1287,1286,1285,1284,1279,1278,1277,1271,1267,1260,
        1259,1258,1257,1256,1254,1251,1248,1247,1246,1245,
        1244,1243,
        1238,1236,1235,1234,1233,1232,1229,1228,1226,1225,
        1224,1223,1200,1199,1177,1175,1174,1173,
        1168,1167,1165,1164,1163,1162,1161,1159,
        1158,1156,1150,1149,1148,1147,1146,1145,
        1144,1128,1126,1125,1124,1121,1119,1111,1109,
        1101,1097,1096,1089,1088,1085,1083,1080,1078,
        1072,1071,1069,1067,1063,1062,1061,1060,1056,
        1055,1049,1045,1039,1038,1035,1033,1031,1029,
        1024,1023,1018,1016,1015,1010,1008,1005,1004,
        999,998,994,988,987,986,976,974,969,968,967,965,
        964,963,962,961,960,959,958,957,956,955,954,953,
        951,950,949,948,947,945,943,939,938,937,936,933,
        927,924,923,917,916,915,914,913,908,905,902,896,
        895,890,889,885,882,877,876,870,869,868,864,861,
        855,853,852,840,836,832,829,824,820,814,806,805,
        804,797,792,791,784,783,782,781,778,768,763,724,
        709,707,706,704,703,702,701,700,699,698,697,696,
        695,694,692,691,690,689,683,679,677,676,675,674,
        673,671,670,669,668,667,666,665,664,663,662,661,
        660,659,657,656,655,654,653,652,651,649,648,647,
        646,645,644,643,642,634,628,627,625,624,623,622,
        621,620,619,618,609,608,607,605,600,593,592,591,
        581,579,578,564,563,562,557,554,552,546,542,536,
        528,527,525,524,523,520,516,512,511,507,506,504,
        503,500,498,497,496,493,480,476,474,470,469,468,
        467,466,465,464,463,462,461,460,459,458,456,455,
        454,453,450,449,448,447,446,445,444,443,438,437,
        436,435,433,432,431,430,429,424,423,420,419,418,
        417,411,410,409,407,405,404,403,401,398,397,389,
        383,379,378,377,375,365,364,347,337,331,330,326,
        325,322,318,315,314,313,312,311,310,309,308,307,
        306,305,304,301,300,299,298,297,296,295,294,293,
        292,290,289,288,286,284,283,282,281,280,279,278,
        277,276,275,274,273,271,270,268,267,266,264,263,
        262,260,258,257,254,253,250,245,244,242,241,240,
        239,236,235,234,232,231,229,228,227,225,224,223,
        222,221,220,217,216,215,214,212,211,210,209,208,
        207,202,201,197,196,193,191,190,189,188,187,181,
        180,179,177,176,175,173,172,171,170,161,160,159,
        157,156,155,154,153,152,149,147,146,144,143,142,
        140,133,132,130,129,127,126,125,119,118,116,115,
        114,111,107,106,104,101,98,96,91,90,89,87,86,85,
        84,81,80,79,78,77,75,73,71,70,69,66,65,64,63,58,
        56,55,54,53,52,50,49,48,47,32,31,30,29,28,27,9,5
    ];
    if(!isNaN(id)) list = list.filter(x=>x !== Number(id));
    return list;
}