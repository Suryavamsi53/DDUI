



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




<template>
  <div>
    <h1>Lookup Table</h1>

    <!-- Button to fetch metadata, if needed -->
    <button @click="getMetadata()">Get Metadata</button>
    
    <!-- Display error message if there is an error -->
    <h3 v-if="errorMsg">{{ errorMsg }}</h3>
    
    <!-- Container for data table -->
    <div class="data-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Lookup Id</th>
            <th>Lookup Type</th>
            <th>Lookup Code</th>
            <th>Lookup Desc</th>
            <th>Is Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lookup in paginatedLookups" :key="lookup.Lookup_Id">
            <td>{{ lookup.Lookup_Id }}</td>
            <td>{{ lookup.Lookup_Type }}</td>
            <td>{{ lookup.Lookup_Code }}</td>
            <td>{{ lookup.Lookup_Desc }}</td>
            <td>{{ lookup.Is_Active }}</td>
            <td>
              <button @click="editLookup(lookup)">Edit</button>
              <button @click="deleteLookup(lookup.Lookup_Id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination controls -->
    <div class="pagination" v-if="lookups.length > pageSize">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
    
    <!-- Add Lookup Form -->
    <div class="add-form" v-if="showAddForm">
      <h2>{{ editMode ? 'Edit Lookup' : 'Add New Lookup' }}</h2>
      <form @submit.prevent="addLookup">
        <input v-model="newLookup.Lookup_Id" placeholder="Lookup ID">
        <input v-model="newLookup.Lookup_Type" placeholder="Lookup Type">
        <input v-model="newLookup.Lookup_Code" placeholder="Lookup Code">
        <input v-model="newLookup.Lookup_Desc" placeholder="Lookup Description">
        <input v-model="newLookup.Is_Active" placeholder="Is Active">
        <button type="submit">{{ editMode ? 'Update' : 'Add' }}</button>
        <button type="button" @click="cancelAdd">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LookupList',
  data() {
    return {
      lookups: [],
      currentPage: 1,
      pageSize: 5,  // Adjusted for demonstration purposes
      errorMsg: "",
      newLookup: {
        Lookup_Id: '',
        Lookup_Type: '',
        Lookup_Code: '',
        Lookup_Desc: '',
        Is_Active: ''
      },
      editMode: false,
      currentLookupId: null,
      showAddForm: false
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.lookups.length / this.pageSize);
    },
    paginatedLookups() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.lookups.slice(startIndex, startIndex + this.pageSize);
    }
  },
  created() {
    this.fetchLookups();
  },
  methods: {
    async fetchLookups() {
      try {
        const response = await axios.get('http://localhost:3012/lookups');
        this.lookups = response.data;
      } catch (error) {
        console.error('Error fetching lookups:', error);
        this.errorMsg = 'Error fetching lookups';
      }
    },
    async addLookup() {
      try {
        if (this.editMode) {
          await axios.put(`http://localhost:3012/lookups/${this.currentLookupId}`, this.newLookup);
        } else {
          await axios.post('http://localhost:3012/lookups', this.newLookup);
        }
        this.fetchLookups();
        this.resetForm();
      } catch (error) {
        console.error('Error adding/updating lookup:', error);
      }
    },
    editLookup(lookup) {
      this.newLookup = { ...lookup };
      this.editMode = true;
      this.currentLookupId = lookup.Lookup_Id;
      this.showAddForm = true;
    },
    async deleteLookup(id) {
      try {
        await axios.delete(`http://localhost:3012/lookups/${id}`);
        this.fetchLookups();
      } catch (error) {
        console.error('Error deleting lookup:', error);
      }
    },
    cancelAdd() {
      this.resetForm();
      this.showAddForm = false;
    },
    resetForm() {
      this.newLookup = {
        Lookup_Id: '',
        Lookup_Type: '',
        Lookup_Code: '',
        Lookup_Desc: '',
        Is_Active: ''
      };
      this.editMode = false;
      this.currentLookupId = null;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    getMetadata() {
      // Implement getMetadata method if needed
    }
  }
};
</script>

<style scoped>
/* Scoped styles specific to this component */
h1 {
  margin-top: 20px;
  font-size: 24px;
}

.data-container {
  margin-top: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th, .data-table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.data-table th {
  background-color: #f2f2f2;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tbody tr:hover {
  background-color: #f1f1f1;
}

.pagination {
  margin-top: 10px;
}

.pagination button {
  margin-right: 5px;
  padding: 6px 12px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #ced4da;
  cursor: not-allowed;
}

.pagination span {
  margin-left: 10px;
}

.add-form {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  max-width: 600px;
}

.add-form h2 {
  margin-top: 0;
  font-size: 20px;
  margin-bottom: 10px;
}

.add-form form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.add-form input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-form button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.add-form button[type="button"] {
  background-color: #6c757d;
}

.add-form button[type="submit"] {
  grid-column: span 2;
}

.add-form button[type="submit"]:hover,
.pagination button:hover,
.add-form button[type="button"]:hover {
  opacity: 0.8;
}

</style>
