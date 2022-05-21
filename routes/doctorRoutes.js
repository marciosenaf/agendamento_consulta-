const router = require('express').Router()

const Doctor = require('../models/Doctor')

//rotas da api 

//POST
router.post('/', async  (req, res) => {
    //req body
    const {nome ,dia , horario } = req.body
    
    const ocupado = await Doctor.findOne({ dia: dia, horario: horario });

    if (ocupado) {
      return res.status(422).json({ msg: "um medico já está atendendo nesse horario" });
    }
 
    
    const doctor = {
        nome,
        dia,
       horario
    }
    
    try{
    
        await Doctor.create(doctor)
    
        res.status(201).json({message: 'Cronograma do medico inserido com sucesso'})
    
    }catch (error) {
    
        res.status(500).json({error: error})
    
    }
    
    })
// read- leitura de dados
//GET
router.get('/', async (req, res) => {
    try{
        const doctors = await Doctor.find()
        res.status(200).json(doctors)
    }catch (error) {
        res.status(500).json({ error: error})
    }
})

    //delete 

    router.delete('/:id', async (req, res) => {
        const id = req.params.id
    
        const doctor = await Doctor.findOne({ _id : id})
        
        if (!doctor){
            res.status(422).json({menssagem : 'O usuario não pode ser encontrado'})
        return
        }
        try{ 
    
            await Doctor.deleteOne( {_id : id })
            res.status(200).json({menssagem: 'Usuario removido com sucesso'})
    
        }catch(error){
            res.status(500).json({error: error})
        }
    })
    module.exports = router  
    