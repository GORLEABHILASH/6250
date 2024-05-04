const events = [
     {
        id:1,
        name: "Boston Hiring Event",
        type: "Job Fair",
        location: "Boston Convention Center",
        date: "2024-05-29",
        time: "10:00 AM",
        seats: 2,
        availableseats:2,
        description: "Connect with top employers in technology and finance. Attend workshops to enhance your job hunting skills."
    },
    {
        id:2,
        name: "Tech Innovators Conference",
        type: "Conference",
        location: "Silicon Valley Tech Hub",
        date: "2024-06-15",
        time: "09:00 AM",
        seats: 500,
        availableseats:0,
        description: "Explore cutting-edge technology innovations. Network with leading tech entrepreneurs and investors."
    },
     {
        id:3,
        name: "Healthcare Career Expo",
        type: "Expo",
        location: "Chicago Expo Center",
        date: "2024-07-20",
        time: "08:00 AM",
        seats: 300,
        availableseats:300,
        description: "Meet healthcare industry leaders and discover career opportunities. Learn about advancements in medical technology."
    },
      {
        id:4,
        name: "Green Energy Summit",
        type: "Summit",
        location: "New York City Energy Hub",
        date: "2024-08-05",
        time: "10:00 AM",
        seats: 400,
        availableseats:400,
        description: "Discuss sustainable energy solutions with experts. Explore green technologies that are shaping the future."
    },
      {
        id:5,
        name: "Digital Marketing Workshop",
        type: "Workshop",
        location: "Online",
        date: "2024-09-01",
        time: "11:00 AM",
        seats: 100,
        availableseats:100,
        description: "Enhance your digital marketing skills. Learn strategies from top digital marketers and content creators."
    },
      {
        id:6,
        name: "Real Estate Networking Event",
        type: "Networking",
        location: "Miami Beach Resort",
        date: "2024-10-13",
        time: "05:00 PM",
        seats: 150,
        availableseats:150,
        description: "Network with real estate professionals. Gain insights into the market trends and investment opportunities."
    },
     {
        id:7,
        name: "International Education Fair",
        type: "Fair",
        location: "Los Angeles Convention Center",
        date: "2024-11-10",
        time: "09:00 AM",
        seats: 250,
        availableseats:250,
        description: "Meet representatives from top universities worldwide. Find out about scholarship opportunities and study abroad programs."
    },
      {
        id:8,
        name: "Culinary Arts Festival",
        type: "Festival",
        location: "San Francisco Bay Area",
        date: "2024-12-22",
        time: "12:00 PM",
        seats: 200,
        availableseats:200,
        description: "Taste exquisite dishes from renowned chefs. Experience the vibrant culinary scene and latest food trends."
    },
     {
        id:9,
        name: "Entrepreneurs Bootcamp",
        type: "Bootcamp",
        location: "Austin Startup Hub",
        date: "2025-01-15",
        time: "08:00 AM",
        seats: 120,
        availableseats:120,
        description: "Kickstart your business ideas. Learn from successful entrepreneurs about building and funding startups."
    },
     {
        id:10,
        name: "Art and Design Exhibit",
        type: "Exhibit",
        location: "Seattle Art Museum",
        date: "2025-02-28",
        time: "10:00 AM",
        seats: 300,
        availableseats:300,
        description: "Discover contemporary art and innovative designs. Engage with artists and designers from around the globe."
    }
];



// Function to get event data by event ID
function getEventData(eventId) {
    // Find the event with the specified ID
    const event = events.find(event => event.id === parseInt(eventId, 10));
    if (!event) {
        return { error: "Event not found" };
    }
    return event;
}

// Function to book a seat for an event
function findSeat(eventId) {
    const event = events.find(event => event.id === eventId);
    if (!event) {
        return { error: "Event not found" };
    }
    if (event.availableseats > 0) {
      
        return true;
    } else {
        return false;
    }
}

function bookSeat(eventId) {
    const event = events.find(event => event.id === eventId);
    if (!event) {
        return { error: "Event not found" };
    }
    if (event.availableseats > 0) {
        event.availableseats -= 1;
        return true;
    } else {
        return false;
    }
}

// Function to get all events
function getAllEvents() {
    return events;
}


module.exports = {
    getEventData,
    bookSeat,
    getAllEvents,
    findSeat,
  
  };
  