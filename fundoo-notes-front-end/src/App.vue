<!-- comment
This is the component where all the routers are defined. This is the main component
-->

<template>
  <div id="app">
    <router-link to="/register" />
    <router-link to="/login" />
    <router-link to="/forgotPassword" />
    <router-link to="/resetPassword/:token" />
    <router-link to="/dashboard/notes" />
     <router-link to="/dashboard/trash"></router-link>
    <router-view />
  </div>
</template>

