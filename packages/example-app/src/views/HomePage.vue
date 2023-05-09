<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Test SSL Pinning</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-text color="primary">
        <p>Response: {{ response }}</p>
      </ion-text>
      <ion-label>URL:</ion-label>
      <ion-input
        :value="url"
        @onIonChange="setUrl($event.detail.value)"
        placeholder="Enter URL"
      ></ion-input>

      <IonLabel>Implementation:</IonLabel>
      <ion-select
        placeholder="Select Implementation"
        @onIonChange="setImpl($event.detail.value)"
        :value="impl"
      >
        <ion-select-option value="FETCH">Fetch</ion-select-option>
        <ion-select-option value="XHR">XMLHttpRequest</ion-select-option>
        <ion-select-option value="CAPACITOR">Capacitor</ion-select-option>
      </ion-select>

      <ion-button expand="block" @click="sendRequest()">
        Send Request
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { CapacitorHttp } from '@capacitor/core';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonLabel, IonInput, IonButton, IonSelectOption } from '@ionic/vue';
import { ref } from 'vue';

const response = ref('');
const url = ref('https://jsonplaceholder.typicode.com/posts/1');
const impl = ref<'FETCH' | 'XHR' | 'CAPACITOR'>('FETCH');
const headers = '{"Content-Type": "application/json; charset=UTF-8"}';

function setImpl(implToSet: 'FETCH' | 'XHR' | 'CAPACITOR') {
  impl.value = implToSet;
}

function setUrl(urlToSet: string) {
  url.value = urlToSet;
}

function setResponse(resp: string) {
  response.value = resp;
}

function sendRequest() {
  if (impl.value === 'FETCH') {
      sendRequestFetch();
    } else if (impl.value === 'XHR') {
      sendRequestXHR();
    } else {
      sendRequestCapacitor();
    }
}

async function sendRequestFetch() {
  try {
    const response = await fetch(url.value, {
      headers: JSON.parse(headers),
      method: "GET",
      body: undefined,
    });

    const responseJSON = await response.json();
    setResponse(JSON.stringify(responseJSON));
  } catch (err: any) {
    setResponse(err.message);
  }
}

async function sendRequestXHR() {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url.value, true);

    for (const [key, value] of Object.entries(JSON.parse(headers))) {
      xhr.setRequestHeader(key, `${value}`);
    }

    xhr.onload = function () {
      setResponse(xhr.responseText);
    };

    xhr.onerror = function () {
      setResponse(xhr.responseText);
    };

    xhr.send();
    
  } catch (err: any) {
    setResponse(err.message);
  }
};

async function sendRequestCapacitor() {
  const response = await CapacitorHttp.request({
    url: url.value,
    method: "GET",
    data: undefined,
    headers: JSON.parse(headers),
  });

  setResponse(JSON.stringify(response.data));
};

</script>

<style scoped>
</style>
