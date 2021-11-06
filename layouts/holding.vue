<template>
  <div id="container">
    <header>
      <h1>
        <span class="logo-fade">Space</span> Between
      </h1>
      <p><img src="/images/logo-venn.svg" width="129" height="82" alt=""></p>
      <p>counselling & psychotherapy</p>
    </header>
    <div class="semi-circle">
      <p>arriving soon</p>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Zen Kaku Gothic Antique', sans-serif;
  overflow: hidden;
}

header {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
}

header h1 {
  font-family: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
  text-transform: uppercase;
  letter-spacing: .2em;
  word-spacing: -.2em;
  font-weight: normal;
}

.logo-fade {
  color: #9e9e9e;
}

header, p {
  text-align: center;
}

.semi-circle {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  height: 150px;
  width: 300px;
  border-radius: 150px 150px 0 0;
  border: 1px solid #000;
  font-size: 1.2em;
}
</style>
