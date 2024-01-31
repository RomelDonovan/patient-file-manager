<template>
  <div>
    <ul class="list">
      <li v-for="patient in patients" :key="patient.id">{{ patient.name }}</li>
    </ul>
  </div>
</template>

<style>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<script>
export default {
  data() {
    return {
      patients: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/sentry-health-79f48/databases/(default)/documents/patients';

      fetch(firestoreUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.documents && data.documents.length > 0) {
            this.patients = data.documents.map((document) => ({
              id: document.name.split('/').pop(),
              ...document.fields,
            }));

            this.patients.forEach((patient) => {
              Object.keys(patient).forEach((key) => {
                if (patient[key] && patient[key].hasOwnProperty('stringValue')) {
                  patient[key] = patient[key].stringValue;
                }
              });
            });
            this.patients.sort((a, b) => a.name.localeCompare(b.name));
          } else {
            console.error('No documents found in the response:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
  },
};
</script>