<template>
  <div class="container">
    <header>
      <h1>Data Driven UI</h1>
      <nav>
        <ul>
          <li><router-link to="/ddui/src/App.vue">Home</router-link></li>
          <li><router-link to="/ddui/src/components/Databases.vue">Databases</router-link></li>
          <li><router-link to="/ddui/src/components/Contact.vue">Contact us</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2023 Data Driven UI</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.container {
  font-family: sans-serif;
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin-right: 50px;
  margin-top: 30px;
}

a {
  text-decoration: none;
  color: #333;
}

main {
  padding: 20px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px;
  background-color: #f5f5f5;
  color: #333;
}
</style>

