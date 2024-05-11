

let idCoord = [];
let idDetail = [];


async function fetchTraffyPartial(keyword, off){

    const name = "นายณัฐพงษ์ ดิสสานนท์"
    const org = "นิสิตชั้นปีที่ 2 ภาควิชาวิศวกรรมคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย"
    const purpose = "ใช้ประกอบการทำโครงงานรายวิชา Embedded System Lab"
    const email = "tontooey@gmail.com"
    const problem_type = "ต้นไม้";
    const text = keyword;
    const limit = 1000;
    const offset = off;

    const url = encodeURI(`https://publicapi.traffy.in.th/teamchadchart-stat-api/geojson/v1?
    output_format=json&limit=${limit}&name=${name}&org=${org}
    &purpose=${purpose}&email=${email}&problem_type=${problem_type}&text=${text}&offset=${offset}`);
    
    const result = await fetch(url).then((r) => r.json());
    return result.features;
}

async function fetchTraffyFull(keyword, lim){

    const name = "นายณัฐพงษ์ ดิสสานนท์"
    const org = "นิสิตชั้นปีที่ 2 ภาควิชาวิศวกรรมคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย"
    const purpose = "ใช้ประกอบการทำโครงงานรายวิชา Embedded System Lab"
    const email = "tontooey@gmail.com"
    const problem_type = "ต้นไม้";
    const text = keyword;
    const limit = Math.min(25000, lim);

    const url = encodeURI(`https://publicapi.traffy.in.th/teamchadchart-stat-api/geojson/v1?
    output_format=json&limit=${limit}&name=${name}&org=${org}
    &purpose=${purpose}&email=${email}&problem_type=${problem_type}&text=${text}`);
    
    const result = await fetch(url).then((r) => r.json());
    return result.features;
}

async function getTraffyData(){
    let problemCount = 0;
    const newIdCoord = [];
    (await fetchTraffyFull("",25000)).forEach(i => {
        problemCount++;
        newIdCoord.push({ticket_id: i.ticket_id, coords: i.coords, state: i.state})
    });;
    idCoord = newIdCoord;
    // console.log(problemCount);

    const newIdDetail = [];
    for (let i = 0; i < Math.ceil(problemCount/1000); i++) {
        (await fetchTraffyPartial("",i * 1000)).forEach(e => {
                if (e.properties.description != "ไม่แสดงรายละเอียด"){
                    newIdDetail.push({ticket_id: e.properties.ticket_id, description: e.properties.description,
                        timestamp: e.properties.timestamp, photo_url: e.properties.photo_url, 
                        address: e.properties.address, state: e.properties.state, lat: e.geometry.coordinates[1],
                        long: e.geometry.coordinates[0]
                    })
                }
                
        });;
    }
    idDetail = newIdDetail;
    console.log(idDetail.length);
    return idDetail;
}

async function main(){
    const fs = require('fs');
    const result = await getTraffyData();
    fs.writeFile("data.txt", JSON.stringify(result), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

main();









