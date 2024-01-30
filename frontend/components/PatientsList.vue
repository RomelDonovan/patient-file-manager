<template>
  <div>
    <ul>
      <li v-for="patient in patients" :key="patient.id">{{ patient.name }}</li>
    </ul>
  </div>
</template>

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
          // Check if data.documents is defined and contains documents
          if (data.documents && data.documents.length > 0) {
            // Extract relevant information from Firestore response
            this.patients = data.documents.map((document) => ({
              id: document.name.split('/').pop(), // Extracting the document ID
              ...document.fields, // Include all fields in the 'patients' object
            }));

            // Remove "stringValue" property from each field
            this.patients.forEach((patient) => {
              Object.keys(patient).forEach((key) => {
                if (patient[key] && patient[key].hasOwnProperty('stringValue')) {
                  patient[key] = patient[key].stringValue;
                }
              });
            });
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