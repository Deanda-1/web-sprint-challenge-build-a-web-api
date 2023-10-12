const Actions = require('./actions-model')
const Project = require('../projects/projects-model')

async function checkActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if(action) {
            req.action = action;
            next();
        }
     else {
        next({ status: 404, message: `Action ${req.params.id} not found`})
    }
} catch(err) {
    next(err)
}
}

async function checkNewAction(req, res, next) {
    const { desciption, notes } = req.body;
    if(desciption !== undefined &&
        typeof desciption === 'string' && 
        desciption.length && 
        desciption.trim().length && 
        desciption.length < 129 &&
        notes !== undefined && 
        notes.length && 
        notes.trim().length) {
            next();
        } else {
            res.status(400).json({
                message: 'Action needs a name, valid project id and desciption',
            })
        }
}

async function checkValidProject(req, res, next) {
    const { project_id } = req.body
    const validProject = await Project.get(project_id)
      try {
        if(validProject) {
            next();
        } else {
            next({ status: 404, message: `Project ${project_id} not found`})
        } 
      } catch (error) {
        next(error)
      }
}

module.exports = {
    checkActionId,
    checkNewAction,
    checkValidProject
}