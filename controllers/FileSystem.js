import fs from "fs"; 

export default class FileSystem{
    constructor(filepath){
        this.filepath = filepath;
    }

    async leer(){
        try{
            const content = await fs.promises.readFile(this.filepath, "utf-8");
            return JSON.parse(content);
        }
        catch(err){
            return [];
        }  
    }
    
    async guardar(chat){
        try{
            const content = await this.leer();
            content.push(chat);
            await fs.promises.writeFile(this.filepath, JSON.stringify(content, null, "\t"));
            console.log(`Chat inserted`);
        }
        catch(err){
            console.log("Writing File error ", err);
        }       
    }

    async borrar(){
        try{
            fs.promises.unlink(this.filepath);
            console.log (`${this.filepath} deleted`);
        }
        catch(err){
            console.log("Deleting File error ", err);
        } 
    }

}