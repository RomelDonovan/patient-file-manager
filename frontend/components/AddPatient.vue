<template>
  <div>
    <form class='title' @submit.prevent="addPatient">
      <label for="newPatientName">Add New Patient: </label>
      <input type="text" v-model="newPatientName" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patient: [],
      newPatientName: ''
    }
  },
  computed: {
    sortedPatients() {
      return this.patients.slice().sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
    },
  },
  mounted() {
    this.addPatient();
  },
  methods: {
    async addPatient() {
      if (!this.newPatientName) {
        return;
      }
      const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/sentry-health-79f48/databases/(default)/documents/patients';
      const response = await fetch(firestoreUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            name: {
              stringValue: this.newPatientName,
            },
          },
        }),
      });
      this.newPatientName = '';
    },
  },
};
</script>