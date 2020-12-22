import react, {useStates} from 'react'

/* function HookCounterThree(){

const [name, setName] = useState({ firstName: '', lastName: '' })
return(
    <form>
        <input type = 'text'
        value = { name.firstName}
        onChange={e => setName({ ...name, firstName: e.target.value })}
        />
        <input type = 'text'
        value = { name.lastName}
        onChange={e => setName({ ...name, lastName: e.target.value })}
        />
        <h2> your first name is - {name.firstName} </h2>
        <h2> your first name is - {name.lastName} </h2>
        <h2> {JASON.stringify(name)}</h2>
    </form>
)
}

export default HookCounterThree */

const FoodsList = () => {
    const [foods, setFoods] = useState([]);

    const handleAddFoods = () => {
        const newFoods ={

        }
        //item
    }
    setFoods([...foods, newFoods])
};

return (
    <>
    <ul>
        {foods.map((food) => (
            <li key={food.id} > 
            </li>
        ))
        }
    </ul>
    <button onClick={handleAddFoods}> agregar </button> 
    </>
)
 