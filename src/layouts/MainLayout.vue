<template>
  <div class="q-pa-lg">
    <div class="row justify-center">
      <h5 class="text-h3">ToDo component</h5>
    </div>
    <div class="row  justify-center">
      <q-input v-model="newToDoContent" class="col-6 " label="To Do" @keyup.enter="addToDo">
        <template v-slot:before>
          <q-icon name="event" />
        </template>

        <template v-slot:append>
          <q-btn
            round
            icon="add"
            color="blue" @click="addToDo"
            :disable="!newToDoContent"
          />
        </template>
      </q-input>
    </div>
  </div>
  <div class="q-pa-lg" v-for="todo in todos">
    <div class="row justify-center"  >
      <q-card class="col-6 my-card" :class="todo.state ? 'bg-grey-3' : ''">
        <div class="row">
          <div class="col-10 items-center">
            <q-card-section >
              <div class="text-h6 text-grey-8" :class="todo.state? 'text-strike':''">{{todo.content}}</div>
            </q-card-section>
          </div>

          <div class="col-1 q-pa-md items-center">
            <div class="row justify-center">
              <q-btn icon="check" round flat color="blue" @click="changeToDoState(todo.id)"></q-btn>
            </div>
          </div>
          <div class="col-1 q-pa-md items-center">
            <div class="row justify-center">
              <q-btn icon="delete"  round flat color="red" @click="deleteToDo(todo.id)"></q-btn>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
//// Import ////
import { ref, onMounted } from 'vue'
import { db } from '../../firebase/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

//// Constants ////
const todos = ref([]);

onMounted( ()=>{
   onSnapshot(collection(db,'todos'), (querySnapshot)=>{
    const fbFromDb = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        state: doc.data().state,
        date: Date.now()
      }
      fbFromDb.push(todo)
    });
    todos.value = fbFromDb;
  });



})


const newToDoContent=ref('');

const addToDo = () => {
   addDoc(collection(db,'todos'), {
    content: newToDoContent.value,
    state: false
  })
  newToDoContent.value = '';
}

const deleteToDo = (id) => {
  deleteDoc(doc(db,'todos',id));
}

const changeToDoState = id =>{
   const index = todos.value.findIndex(todo => todo.id === id)
  updateDoc(doc(db,'todos',id),{
    state: !todos.value[index].state
  })

}



</script>
