const Post= require('./Blog');
const User= require('./User');

Post.belongsTo(User,{
    foreignKey:'user_id'
});

User.hasMany(Post,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

module.exports={Post,User};