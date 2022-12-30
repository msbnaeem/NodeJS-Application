//this is connection so called for the below line
//  connections: create the route module and controller module to handles all requests associated with connections. Complete the routes and controllers for all GET requests.

const {DateTime} = require("luxon");
const {v4: uuidv4} = require('uuid');

const connections = [
    {
        id: '1',
        title: 'ITCS-3153: Implement 8 Queens Board Game',
        topic: 'Study',
        details: 'I am from Java bakground and cannot do such project in Python which \n I never touched. I want some support.',
        date: "2022-10-10",
        startTime: "23:59",
        endTime: "13:00",
        host: 'Mohammad',
        location: 'Woodward Hall 1st floor Room 140',
        // image: 'https://imageio.forbes.com/specials-images/imageserve/5fa46a48a9ca8d255a37c8bd/0x0.jpg?format=jpg&width=1200'
        image: '/images/artificial-intelligencePic.jpg'

    },

    {
        id: '2',
        title: 'ITSC-2214: Data Structures Review',
        topic: 'Study',
        details: 'What are the best approaches for mastering DS & A? \n I want some support.',
        // date: "Monday, October 17, 2022",
        // startTime: "11:00AM",
        // endTime: "1:00PM",
        host: 'Ahmad',
        location: 'Woodward Hall 1st floor Room 140',
        image: 'https://miro.medium.com/max/1400/1*2rKGJ6h1regwmfMcty3SLw.png'
    },

    {
        id: '3',
        title: 'ITSC-3181: What is Assembly Language?',
        topic: 'Study',
        details: 'I am having hard time understanding what assembly language supposed to do. \n Any support would be appreciated!.',
        // date: "Monday, October 24, 2022",
        // startTime: "11:00AM",
        // endTime: "1:00PM",
        host: 'Salim',
        location: 'Woodward Hall 1st floor Room 140',
        image: 'https://www.freecodecamp.org/news/content/images/2022/04/arm-1.png'
    },

    {
        id: '4',
        title: 'Leetcode Grinding',
        topic: 'Interview Prep',
        details: 'Wanna be ready for incoming tech-interviews? \n Join us for grouped practices and find you practice mates.',
        // date: "Monday, October 31, 2022",
        // startTime: "10:00PM",
        // endTime: "11:00PM",
        host: 'Shahrukh',
        location: 'Woodward Hall 1st floor Room 140',
        image: '/images/leetcode.png'
    },

    {
        id: '5',
        title: 'Data Structures for Interview',
        topic: 'Interview Prep',
        details: 'Wanna be ready for incoming tech-interviews? \n Join us to master data structures for interviews',
        // date: "Monday, November 07, 2022",
        // startTime: "10:00PM",
        // endTime: "11:00PM",
        host: 'Shawn',
        location: 'Woodward Hall 1st floor Room 140',
        image: '/images/DSA-in-Interview.png'
    },
    
    {
        id: '6',
        title: 'Resume Build-Up',
        topic: 'Interview Prep',
        details: 'Learn to build amazing resume with us.',
        // date: "Monday, November 07, 2022",
        // startTime: "10:00PM",
        // endTime: "11:00PM",
        host: 'Moosa',
        location: 'Woodward Hall 1st floor Room 140',
        image: '/images/resume.jpg'
    }
];

exports.find = () => connections;

exports.findById = id => connections.find(connection => connection.id == id);

exports.save = function(connection){
    console.log(connection);
    connection.id = uuidv4();
    // connection.date = DateTime.local(now).toLocaleString(DateTime.DATETIME_SHORT);
    connections.push(connection);
};

exports.updateById = (id, newConnection) => {
    let connection = connections.find(connection => connection.id === id);
    if(connection){
        connection.title = newConnection.title;
        connection.host = newConnection.host;
        connection.date = newConnection.date;
        connection.startTime = newConnection.startTime;
        connection.endTime = newConnection.endTime;
        connection.location = newConnection.location;
        connection.image = newConnection.image;
        connection.details = newConnection.details;
        return true;
    } else {
        return false;
    }
    
};

exports.deleteById = id => {
    let index = connections.findIndex(connection => connection.id === id);
    if(index !== -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
};