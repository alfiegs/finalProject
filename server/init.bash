# sequelize model:generate --name user \
#   --attributes email:string,password:string

# sequelize model:generate --name activity \
#   --attributes userid:integer,title:string,note:string,rating:integer

# sequelize model:generate --name friends \
    # --attributes userid:integer,friend:string,friendid:integer

sequelize model:generate --name visitors \
    --attributes name:string,email:string,comments:string




