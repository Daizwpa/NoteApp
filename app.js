
const yargs = require('yargs');//You can run Yargs without any configuration, and it will do its best to parse process.argv:
const fs = require('fs');
const path = require('path');
var arg = yargs.argv;


if(arg._[0] == "add"){
    if(arg.name){
        //edit 
        let name = arg.name + ".note";
        let ls = fs.readdirSync(__dirname);

        let found = false;
        ls.forEach(function(value){// searche for the file
            if(value == name){
               found = true;
               return 0;
            }
        });

        console.log("ok " + found)
        if(!found){
            console.log(`there is not file with the name ${name}`);
            return 0;
        }
        if(arg.title){
            if( arg.message){
                let title = arg.title + ":";
                /* fs.writeFileSync(name, title + ' '+ arg.message +"\n" ); */
                fs.appendFileSync(name,  title + ' '+ arg.message +"\n");
           }
        }
    }

}else if(arg._[0] == "remove"){
    if(arg.name){
        // edit 
        let name = arg.name + ".note";
        let ls = fs.readdirSync(__dirname);
        let found = false;
        ls.forEach(function(value){ // searche for the file
            if(value == name){
               found = true;
               return 0;
            }
        });

        if(!found){
            console.log(`there is not file with the name ${name}`);
            return 0;
        }
        if(arg.title){
            // remove title 
            fs.readFile(name, function(err,buff){
                
                if (err) throw err;
                else{

                    let string = buff.toString();                
                    let subString = string.substring(string.search(arg.title));
                    subString = subString.substring(0, subString.search(';'));
                    string = string.replace(subString+';\n', '');
                    fs.writeFileSync(name, string );
                    console.log(`the string '${subString}' was deleted `);
                }
            })  
            
        }else{
            // remvoe file with name 
            fs.unlink(path.join(__dirname, name), function(err){
                if (err) throw err;
                console.log("down")
            })

        }
    }


}else if(arg._[0] == "create"){
    if(arg.name){
        //edit 
        let name = arg.name + ".note";
        let ls = fs.readdirSync(__dirname);
        let found = false;
        ls.forEach(function(value){ // searche for the file
            if(value == name){
               found = true;
               return 0;
            }
        });
        console.log("ok " + found)
        if(found){
            console.log(`the file real exsits ${name}`);
            return 0;
        }
        
        if(arg.title){
            if( arg.message){
                let title = arg.title + ":";
                fs.writeFileSync(name, title + ' '+ arg.message +"\n" ); 
           }
        }
    }

}else if(arg._[0] == "show"){

}else{
    console.log("node app remove || add || create || show ");
} 