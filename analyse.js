const fs = require('fs');

function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}


// #### CHANGE HERE !! ####

const categorizer = [category_1,category_2,category_3,category_4,category_5,category_6,category_7,category_8,category_9,category_10]
// All functions in this array will be used as a categorizer
// Please note that each problem is allowed to be a part of more than 1 category
// (The tester has already taken care of that)
    
function category_1(problem){//ต้นไม้ล้ม
    keywords = ["โค่น","ล้ม","หัก","ทับ","พาด"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_2(problem){//ต้นไม้ยื่น
    keywords = ["ยื่น","เลื้อย","ล้ำ","เกิน","เข้ามา"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_3(problem){
    keywords = ["สายไฟ"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}

function category_4(problem){
    keywords = ["สูง","ใหญ่"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_5(problem){ //ต้นไม้เหี่ยว
    keywords = ["เฉา","รด","เหี่ยว","แห้ง","ตาย","เหลือง","ซีด"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}

function category_6(problem){
    keywords = ["คลอง","แม่น้ำ","บ่อ","คู","บึง"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_7(problem){
    keywords = ["ปลูก","ใหม่","สวย"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_8(problem){
    keywords = ["ท่อ","ระบาย","หลุม","ราง"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_9(problem){
    keywords = ["เลื้อย"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_10(problem){
    keywords = ["บัง","ปกคลุม"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}


// ##################



function main(){
    const readfile = fs.readFileSync('data.txt', 'utf8');
    const data = JSON.parse(readfile);


    
    
    
    data.forEach(i => {
        i.included = false;
    })
    let totalIncluded = 0;
    console.log("## TEST RESULT ##")
    categorizer.forEach(c => {
        let count = 0;
        data.forEach(i => {
            if (c(i)){
                count++;
                if (!(i.included)){
                    totalIncluded++;
                    i.included = true;
                }
            }
        })
        console.log("- " + functionName(c) + " has " + count + " members");
    })
    const percent = (totalIncluded/(data.length) * 100).toFixed(2);
    console.log("* All functions included a total of " + totalIncluded + " members (" + percent + "%)");
}

main();
