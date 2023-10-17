const express = require('express');
const Projects = require('./projects-model');
const { checkProjectId, checkNewProject, } = require('./projects-middleware');
const router = express.Router();
const app = express();

router.get ('/', async (req, res, next) => {
    const data = await Projects.get()
    try {
      res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', checkProjectId, (req, res, next) => {
    res.json(req.project)
    next();
})

router.get('/projects/:id', async (req, res) => {
    const projectId = req.params.id; 
    const project = project[projectId];
  
    if (project) {
      res.json(project); 
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
    
  });

    app.use('/projects', router);

    const PORT = 3000;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

router.post('/', [checkNewProject], async (req, res, next) => {
    const newPost = await Projects.insert(req.body)
    try {                                               
      res.status(201).json(newPost)
    } catch (error) {
        next(error)
    }
})
 
router.put('/:id', checkProjectId, checkNewProject, async (req, res, next) => {
    const success = await Projects.update(req.params.id, req.body) 
    try {
      res.status(200).json(success)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkProjectId,  (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json()
    })
    .catch(error => next(error))
})

router.get('/:id/actions', checkProjectId, async(req, res, next) => {
    const actions = await Projects.getProjectActions(req.params.id)
    try {
        res.status(200).json(actions)
    } catch (error) {
        next(error)
    }
}) 

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message, 
        customMessage: "error within the Projects router",
    })
    next();
})

module.exports = router