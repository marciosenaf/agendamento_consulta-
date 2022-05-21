const router = require('express').Router()

const Person = require('../models/Person')
const Doctor = require('../models/Doctor')

//rotas da api 

//post
router.post('/', async  (req, res) => {
    //req body
    const {nome,phone,dia,horario  } = req.body
    
    if(!dia){
        res.status(422).json({error: 'O dia é obrigatório!'})
    }

    
    const persons = {
        nome,
        phone,
        dia,
        horario
        
    }

    const ocupado = await Person.findOne({ dia: dia, horario: horario  });

    if (ocupado) {
      return res.status(422).json({ msg: "horario já marcado, tente outro" });
    }



   const day = await Doctor.findOne({dia : dia , horario : horario  });

    if (day) {

    try{
    
        await Person.create(persons)
    
        res.status(201).json({message: 'Consulta marcada com sucesso'})
    
    }catch (error) {
        
        res.status(500).json({error: error})
    
    }

    }else{    res.status(422).json({ msg: "Horário não disponivel, tente novamente" });} 


    
    })

    //get

    router.get('/', async (req, res) => {
        try{
            const people = await Person.find()
            res.status(200).json(people)
        }catch (error) {
            res.status(500).json({ error: error})
            }
        })

        //delete 

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id : id})
    
    if (!person){
        res.status(422).json({menssagem : 'O usuario não pode ser encontrado'})
    return
    }
    try{

        await Person.deleteOne({_id: id})
        res.status(200).json({menssagem: 'Usuario removido com sucesso'})

    }catch(error){
        res.status(500).json({error: error})
    }
})  

    module.exports = router