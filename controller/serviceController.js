const Service = require("../model/service");

// create a new service
const createService  = async (req, res) => {
    try {
        // Extract data from request body
        const body = req.body;
    
        // Create a new category instance
        const newService = new Service(body)
    
        // Save the category to the database
        const savedService = await newService.save();
    
        // Send the saved category in the response
        res.status(201).json(savedService);
      } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

// get all services
const getAllServices = async (req, res) => {
    try {
        const data = await Service.find({}).populate('user').populate('category').sort({ createdAt: -1 });
        res.send(data);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
};

// get all services that matched with a pattern
const getManagerService = async (req, res) => {
    try {
        const filteredData = []
        const {email} = req.params
        const data = await Service.find({}).populate('user').populate('category').sort({ createdAt: -1 });
        for(let service of data) {
            if(service.category.managerEmail === email) {
                filteredData.push(service)
            }
        }
        res.send(filteredData);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
};

// get all services that matched with a pattern
const getUserService = async (req, res) => {
    try {
        const filteredData = []
        const {email} = req.params
        const data = await Service.find({}).populate('user').populate('category').sort({ createdAt: -1 });
        for(let service of data) {
            if(service.user.email === email) {
                filteredData.push(service)
            }
        }
        res.send(filteredData);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
};

// change status of status based on id 
const changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Service.findById(id);
    data.status = req.body.status;
    const savedService = await data.save();
    res.send(savedService);
  } catch (error) {
    console.error('Error changing status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const countServiceOfCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data = await Service.find({category: categoryId});
    const filterDataBasedOnCompleteStatus = data.filter((service) => service.status === 'completed');
    res.send(filterDataBasedOnCompleteStatus);
  } catch (error) {
    console.error('Error changing status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {createService,getAllServices,getManagerService,getUserService,changeStatus,countServiceOfCategory}