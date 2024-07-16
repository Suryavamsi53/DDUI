



<!-- src/components/Databases.vue -->

<template>
  <h1>hello world</h1>
  <div>
    <h1>Lookup List</h1>
    
    <!-- Form for adding/updating lookups -->
    <form @submit.prevent="addLookup" class="lookup-form">
      <input v-model="newLookup.RevisionSeq" placeholder="Revision Seq" />
      <input v-model="newLookup.UpdatedBy" placeholder="Updated By" />
      <input v-model="newLookup.UpdateTS" placeholder="Update TS" type="datetime-local" />
      <input v-model="newLookup.LookupType" placeholder="Lookup Type" />
      <input v-model="newLookup.LookupCode" placeholder="Lookup Code" />
      <input v-model="newLookup.LookupDescription" placeholder="Lookup Description" />
      <input v-model="newLookup.AdditionalAttrib01" placeholder="Additional Attrib 01" />
      <input v-model="newLookup.IsActive" placeholder="Is Active" />
      <button type="submit">{{ editMode ? "Update Lookup" : "Add Lookup" }}</button>
    </form>

    <!-- Table to display lookups -->
    <table>
      <thead>
        <tr>
          <th>Revision Seq</th>
          <th>Updated By</th>
          <th>Update TS</th>
          <th>Lookup Type</th>
          <th>Lookup Code</th>
          <th>Lookup Description</th>
          <th>Additional Attrib 01</th>
          <th>Is Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lookup in lookups" :key="lookup.id" class="lookup-row">
          <td>{{ lookup.RevisionSeq }}</td>
          <td>{{ lookup.UpdatedBy }}</td>
          <td>{{ lookup.UpdateTS }}</td>
          <td>{{ lookup.LookupType }}</td>
          <td>{{ lookup.LookupCode }}</td>
          <td>{{ lookup.LookupDescription }}</td>
          <td>{{ lookup.AdditionalAttrib01 }}</td>
          <td>{{ lookup.IsActive }}</td>
          <td>
            <button @click="editLookup(lookup)">Edit</button>
            <button @click="deleteLookup(lookup.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/lookups'; // Replace with your API endpoint

export default {
  name: 'LookupList',
  data() {
    return {
      lookups: [],
      newLookup: {
        RevisionSeq: '',
        UpdatedBy: '',
        UpdateTS: '',
        LookupType: '',
        LookupCode: '',
        LookupDescription: '',
        AdditionalAttrib01: '',
        IsActive: ''
      },
      editMode: false,
      currentLookupId: null
    };
  },
  methods: {
    // Fetch all lookups from API
    fetchLookups() {
      axios.get(API_URL)
        .then(response => {
          this.lookups = response.data;
        })
        .catch(error => {
          console.error('Error fetching lookups:', error);
        });
    },
    // Add or update a lookup
    addLookup() {
      if (this.editMode) {
        this.updateLookup();
      } else {
        axios.post(API_URL, this.newLookup)
          .then(() => {
            this.fetchLookups();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding lookup:', error);
          });
      }
    },
    // Edit a lookup
    editLookup(lookup) {
      this.newLookup = { ...lookup };
      this.editMode = true;
      this.currentLookupId = lookup.id;
    },
    // Update a lookup
    updateLookup() {
      axios.put(`${API_URL}/${this.currentLookupId}`, this.newLookup)
        .then(() => {
          this.fetchLookups();
          this.resetForm();
        })
        .catch(error => {
          console.error('Error updating lookup:', error);
        });
    },
    // Delete a lookup
    deleteLookup(id) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          this.fetchLookups();
        })
        .catch(error => {
          console.error('Error deleting lookup:', error);
        });
    },
    // Reset the form
    resetForm() {
      this.newLookup = {
        RevisionSeq: '',
        UpdatedBy: '',
        UpdateTS: '',
        LookupType: '',
        LookupCode: '',
        LookupDescription: '',
        AdditionalAttrib01: '',
        IsActive: ''
      };
      this.editMode = false;
      this.currentLookupId = null;
    }
  },
  mounted() {
    this.fetchLookups(); // Fetch lookups when component is mounted
  }
};
</script>

<style scoped>
/* Add some basic styling to the component */
.lookup-form {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.lookup-row {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.lookup-row:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

button {
  margin-right: 10px;
}
</style>

<!--
<template>
  <div>
    <h1>DatabasesList</h1>
   
  <ul>
    <li v-for="database in databases" :key="database.id">{{ database.name }}</li>
  </ul>
 
 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DatabaseList',
  data() {
    return {
      databases: [] // Initialize an empty array for databases
    };
  },
  mounted() {
    axios.get('/api/databases')
      .then(response => {
        this.databases = response.data; // Assuming response.data contains an array of databases
        console.log('Fetched databases:', this.databases); // Log fetched data for debugging
      })
      .catch(error => {
        console.error('Error fetching databases:', error);
      });
  }
};
</script>



<style scoped>
  /* Add some basic styling to the component */
  div {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #333;
    margin-top: 0;
  }

  p {
    color: #666;
  }
</style>
-->