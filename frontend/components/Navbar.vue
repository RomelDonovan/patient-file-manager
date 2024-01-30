<template>
  <nav>
    <ul>
      <li><router-link to="/">Sentry Health</router-link></li>
    </ul>
  </nav>
</template>

<style>
nav {
  background-color: #333;
  padding: 10px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-right: 15px;
}

a {
  text-decoration: none;
  color: white;
}
</style>