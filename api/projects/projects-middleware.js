const Projects = require('./projects-model');

async function checkProjectCreatePayload(req, res, next) {
    if (req.body.name && req.body.description) {
      next()
    } else {
      next({
        status: 400,
        message: 'Please provide name and description for the project',
      });
    }
  }
  
  async function checkProjectUpdatePayload(req, res, next) {
    if (req.body.name && req.body.description && req.body.completed !== undefined) {
      next()
    } else {
      next({
        status: 400,
        message: 'Please provide name, description and completed status',
      });
    }
  }

async function checkProjectId(req, res, next) {
    try {
      const project = await Projects.get(req.params.id);
      if (project) {+
        req.project = project;
        next();
      } else {
        next({ status: 404, message: `Project ${req.params.id} not found` });
      }
    } catch (error) {
      next({error: 'Error getting the project'});  
    }
  }

async function checkNewProject(req, res, next) {
    const { name, description, completed } = req.body;
    if(name !== undefined && 
        typeof name === 'string' && 
        name.length &&
        name.trim().length &&
        description !== undefined &&
        description.length &&
        description.trim().length &&
        completed !== undefined) {
            next()
        } else {
            res.status(400).json({message: 'project needs a name and description',
           })
        }
}

module.exports = {
    checkProjectUpdatePayload,
    checkProjectCreatePayload,
    checkProjectId,
    checkNewProject,
}