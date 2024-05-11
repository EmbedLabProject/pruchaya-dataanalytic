const fs = require('fs');

function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}


// #### CHANGE HERE !! ####

const categorizer = [category_1,category_2]
// All functions in this array will be used as a categorizer
// Please note that each problem is allowed to be a part of more than 1 category
// (The tester has already taken care of that)
    
function category_1(problem){
    keywords = ["โค่น","ล้ม"];
    for (let k of keywords){
        if (problem.description.includes(k)){
            return true;
        }
    }
    return false;
}
function category_2(problem){
    keywords = ["โค่น"];
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
