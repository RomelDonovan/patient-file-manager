<template>
  <div class="container">
    <ul>
      <div>
        <div class="list Header">
          <span class="table">
            ID
          </span>
          <span class="table">
            Name
          </span>
          <span class="table">
            Actions
          </span>
        </div>
        <NuxtLink to="/profile">
          <li v-for="patient in patients" :key="patient.id" @click="patient">
            <div class="list">
              <span class="table id">
                {{ patient.id }}
              </span>
              <span class="table name">
                {{ patient.name }}
              </span>
              <span class="table action">
                <button @click="editPatient(patient.id)">Edit</button>
                <button @click="deletePatient(patient.id)">Delete</button>
              </span>
            </div>
          </li>
        </NuxtLink>
      </div>
    </ul>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
}

.list {
  display: flex;
}

.table {
  border: 1px solid black;
  text-align: center;
  padding: 10px;
  width: 300px;
}

.id {
  color: black;
}

.name {
  color: black;
}

button {
  margin: 0 5px;
}

.action {
  display: flex;
  justify-content: center;
  width: 300px;
}

.Header {
  font-weight: bold;
  font-size: larger;
}
</style>

<script>
export default {
  data() {
    return {
      patients: [],
    };
  },
  async mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/sentry-health-79f48/databases/(default)/documents/patients';
      const response = await fetch(firestoreUrl);
      const data = await response.json();
      this.patients = data.documents.map((doc) => {
        return {
          id: doc.name.split('/').pop(),
          name: doc.fields.name.stringValue,
        };
      });
      this.patients = this.patients.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
};
</script>