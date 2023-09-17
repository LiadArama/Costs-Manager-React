import React, { useState } from 'react';
import {idb} from '../idb';
import '../componentsStyle/costs-form.css'

function CostsForm() {
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('FOOD');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(sum === null || sum === '0'){
      alert('Need to specify amount!');
      setSum('');
      setCategory('FOOD');
      setDescription('');
    } else if(sum < 0){
      alert('A negative number is not valid!');
      setSum('');
      setCategory('FOOD');
      setDescription('');
    } else {
      try {
        const db = await idb.openCostsDB("costsdb", 1);
        const result = await db.addCost({sum, category, description});
        console.log("Adding cost succeeded:", result);
        setSum('');
        setCategory('FOOD');
        setDescription('');
      } catch (error) {
        console.error('Error adding cost:', error);
      }
    }
  };

  return (
    <div className='costs-form'>
      <h2>Add New Cost</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Sum:
            <input
              type="number"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='FOOD'>Food</option>
              <option value='HEALTH'>Health</option>
              <option value='EDUCATION'>Education</option>
              <option value='TRAVEL'>Travel</option>
              <option value='HOUSING'>Housing</option>
              <option value='OTHER'>Other</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type='submit'>Add Cost</button>
        </div>
      </form>
    </div>
  );
}

export default CostsForm;
