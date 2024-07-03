// src/seed.js
import  mongoose from 'mongoose';
import  Role  from './models/role.model.js';
import  Permission  from './models/permission.model.js';
import "dotenv/config";


const createRolesAndPermissions = async () => {
    const permissions = [
        { name: 'create:teams', description: 'Create teams' },
        { name: 'read:teams', description: 'Read teams' },
        { name: 'update:teams', description: 'Update teams' },
        { name: 'delete:teams', description: 'Delete teams' },
        { name: 'create:users', description: 'Create users' },
        { name: 'read:users', description: 'Read users' },
        { name: 'update:users', description: 'Update users' },
        { name: 'delete:users', description: 'Delete users' },
    ];

    const roles = [
        { name: 'Admin', permissions: ['create:teams', 'read:teams', 'update:teams', 'delete:teams', 'create:users', 'read:users', 'update:users', 'delete:users'] },
        { name: 'TeamLead', permissions: ['create:teams', 'read:teams', 'update:teams', 'read:users'] },
        { name: 'User', permissions: ['read:teams', 'read:users'] },
    ];

    try {
        await Permission.insertMany(permissions);
        const allPermissions = await Permission.find();
        
        const rolePromises = roles.map(role => {
            const rolePermissions = allPermissions.filter(permission => role.permissions.includes(permission.name));
            return new Role({ name: role.name, permissions: rolePermissions.map(permission => permission._id) }).save();
        });

        await Promise.all(rolePromises);
        console.log('Roles and permissions created successfully.');
    } catch (error) {
        console.error('Error creating roles and permissions:', error);
    }
};

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');
        await createRolesAndPermissions();
        mongoose.disconnect();
    })
    .catch(err => console.error('MongoDB connection error:', err));
