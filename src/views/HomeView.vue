<template>
  <main class="min-h-screen flex flex-col bg-white text-gray transition-all duration-300 bg-gray-10">
    <!-- Main Content -->
    <section
      class="mt-25 lg:mt-20 md:mt-16 px-4 md:px-16 lg:px-80  py-6 flex flex-col lg:flex-row gap-5"
    >
      <!-- Daftar Surat -->
      <div
        class="bg-white shadow-2xl bg-border-100 transition-all duration-300 hidden md:inline-block  md:w-full xl:w-full lg:max-w-md text-white overflow-y-auto h-[80vh] lg:h-[80vh] rounded-2xl p-4 no-scrollbar"
      >
      <div class="mb-4 lg:hidden">
             <div class="items-center flex py-2 bg-gray-800 px-4 rounded-full border border-gray-600">
               <input
                 class="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                 type="text"
                 :placeholder="$t('cari')"
                 v-model="localSearchQuery"
                 @input="updateParentSearch"
               />
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
                 height="20"
                 viewBox="0 0 24 24"
                 class="text-white"
               >
                 <path
                   d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
                 ></path>
               </svg>
             </div>
           </div>
        <ul>
          <li
            v-for="item in filteredSurat"
            :key="item.nomor"
            @click="setActiveSurah(item.nomor)"
            :class="{ active: selectedSurah === item.nomor }"
            class="cursor-pointer p-3 bg-white text-black border bg-border-100 text-gray hover:bg-gray-10 rounded-2xl mb-2 hover:bg-green-700 hover:text-white transition duration-200"
          >
          <strong>{{ convertToArabic(item.nomor) }}. {{ item.namaLatin }}</strong>
            <div class="flex justify-between">
              <span dir="rtl">{{ item.nama }}</span>
              <span>{{ item.jumlahAyat }} Ayat</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Detail Surat -->
      <div v-if="selectedSurat" class="w-full bg-white shadow-2xl bg-border-100 transition-all duration-300 p-6 rounded-2xl">
        <div class="bg-green-500 p-4 rounded-xl">
          <h2 class="text-xl md:text-2xl text-white">
            {{ selectedSurat.namaLatin }} - {{ selectedSurat.nama }} - {{ selectedSurat.tempatTurun }}
          </h2>
          <div class="flex gap-5 items-center ">
            <button @click="playAudio" class="bg-white cursor-pointer text-green-700 px-4 py-2 rounded-xl mt-2">Play</button>
            <button class="bg-white cursor-pointer px-4 py-2 rounded-xl mt-2" @click="openDes">
                <svg class="size-6 fill-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><path d="M20 22H6.5C4.567 22 3 20.433 3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19Z"></path></svg>
            </button>
            <div class="relative inline-block mt-2">
          <!-- Tombol Pengaturan -->
              <button 
                class="bg-white cursor-pointer px-4 py-2 rounded-xl flex items-center space-x-2 shadow"
                @click="IsSetting = !IsSetting"
              >
              <svg class="size-6 fill-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.21232 14.0601C1.91928 12.6755 1.93115 11.2743 2.21316 9.94038C3.32308 10.0711 4.29187 9.7035 4.60865 8.93871C4.92544 8.17392 4.50032 7.22896 3.62307 6.53655C4.3669 5.3939 5.34931 4.39471 6.53554 3.62289C7.228 4.50059 8.17324 4.92601 8.93822 4.60914C9.7032 4.29227 10.0708 3.32308 9.93979 2.21281C11.3243 1.91977 12.7255 1.93164 14.0595 2.21364C13.9288 3.32356 14.2964 4.29235 15.0612 4.60914C15.8259 4.92593 16.7709 4.5008 17.4633 3.62356C18.606 4.36739 19.6052 5.3498 20.377 6.53602C19.4993 7.22849 19.0739 8.17373 19.3907 8.93871C19.7076 9.70369 20.6768 10.0713 21.7871 9.94028C22.0801 11.3248 22.0682 12.726 21.7862 14.06C20.6763 13.9293 19.7075 14.2969 19.3907 15.0616C19.0739 15.8264 19.4991 16.7714 20.3763 17.4638C19.6325 18.6064 18.6501 19.6056 17.4638 20.3775C16.7714 19.4998 15.8261 19.0743 15.0612 19.3912C14.2962 19.7081 13.9286 20.6773 14.0596 21.7875C12.675 22.0806 11.2738 22.0687 9.93989 21.7867C10.0706 20.6768 9.70301 19.708 8.93822 19.3912C8.17343 19.0744 7.22848 19.4995 6.53606 20.3768C5.39341 19.633 4.39422 18.6506 3.62241 17.4643C4.5001 16.7719 4.92552 15.8266 4.60865 15.0616C4.29179 14.2967 3.32259 13.9291 2.21232 14.0601ZM3.99975 12.2104C5.09956 12.5148 6.00718 13.2117 6.45641 14.2963C6.90564 15.3808 6.75667 16.5154 6.19421 17.5083C6.29077 17.61 6.38998 17.7092 6.49173 17.8056C7.4846 17.2432 8.61912 17.0943 9.70359 17.5435C10.7881 17.9927 11.485 18.9002 11.7894 19.9999C11.9295 20.0037 12.0697 20.0038 12.2099 20.0001C12.5143 18.9003 13.2112 17.9927 14.2958 17.5435C15.3803 17.0942 16.5149 17.2432 17.5078 17.8057C17.6096 17.7091 17.7087 17.6099 17.8051 17.5081C17.2427 16.5153 17.0938 15.3807 17.543 14.2963C17.9922 13.2118 18.8997 12.5149 19.9994 12.2105C20.0032 12.0704 20.0033 11.9301 19.9996 11.7899C18.8998 11.4856 17.9922 10.7886 17.543 9.70407C17.0937 8.61953 17.2427 7.48494 17.8052 6.49204C17.7086 6.39031 17.6094 6.2912 17.5076 6.19479C16.5148 6.75717 15.3803 6.9061 14.2958 6.4569C13.2113 6.0077 12.5144 5.10016 12.21 4.00044C12.0699 3.99666 11.9297 3.99659 11.7894 4.00024C11.4851 5.10005 10.7881 6.00767 9.70359 6.4569C8.61904 6.90613 7.48446 6.75715 6.49155 6.1947C6.38982 6.29126 6.29071 6.39047 6.19431 6.49222C6.75668 7.48509 6.90561 8.61961 6.45641 9.70407C6.00721 10.7885 5.09967 11.4855 3.99995 11.7899C3.99617 11.93 3.9961 12.0702 3.99975 12.2104ZM11.9997 15.0002C10.3428 15.0002 8.99969 13.657 8.99969 12.0002C8.99969 10.3433 10.3428 9.00018 11.9997 9.00018C13.6565 9.00018 14.9997 10.3433 14.9997 12.0002C14.9997 13.657 13.6565 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"></path></svg>
                <svg class="size-5 fill-green-500 transition-transform duration-300" :class="{'rotate-180': IsSetting}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>

            <!-- Dropdown Menu -->
              <div 
                v-if="IsSetting" 
                class="absolute right-0 mt-2 w-64 bg-gray-100 bg-gray-10 shadow-xl rounded-xl p-4 transition-opacity transform scale-95 opacity-100"
              >
                <form @submit.prevent class="space-y-4">

                  <!-- Ukuran Font -->
                  <div>
                    <label class="block text-sm font-medium mb-1">Ukuran Font</label>
                    <input type="range" v-model="fontSize" min="10" max="70" class="w-full">
                    <span class="text-sm">{{ fontSize }} px</span>
                  </div>
                
                  <!-- Toggle Sembunyikan Latin -->
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium">Sembunyikan Latin</label>
                    <div 
                      @click="hideLatin = !hideLatin"
                      class="relative w-12 h-6 bg-green-500 rounded-full transition duration-300 cursor-pointer"
                      :class="{'bg-white': hideLatin}"
                    >
                      <span 
                        class="absolute right-1 top-1 w-4 h-4 bg-gray-600 rounded-full transition-transform duration-300"
                        :class="{'-translate-x-6': hideLatin}"
                      ></span>
                    </div>
                  </div>
                
                  <!-- Toggle Sembunyikan Terjemahan -->
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium">Sembunyikan Terjemahan</label>
                    <div 
                      @click="hideTranslation = !hideTranslation"
                      class="relative w-12 h-6 bg-green-500 rounded-full transition duration-300 cursor-pointer"
                      :class="{'bg-white': hideTranslation}"
                    >
                      <span 
                        class="absolute right-1 top-1 w-4 h-4 bg-gray-600 rounded-full transition-transform duration-300"
                        :class="{'-translate-x-6': hideTranslation}"
                      ></span>
                    </div>
                  </div>
                
                  <!-- Pilih Bahasa Terjemahan -->
                  <div class="p-4 bg-gray-100 rounded-lg shadow bg-gray-10">
                    <label class="block text-sm font-medium mb-1">Pilih Bahasa Terjemahan</label>
                    <select v-model="selectedLanguage" class="w-full p-2 border rounded">
                      <option class="text-black" v-for="(lang, index) in languages" :key="index" :value="lang.value">
                        {{ lang.label }}
                      </option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center mt-2 text-white">
            <span>{{ selectedSurat.jumlahAyat }} Ayat - {{ selectedSurat.arti }}</span>
            <select v-model="selectedQari" @change="updateAudioSource" class="bg-green-700 px-3 py-2 rounded-xl mt-2 sm:mt-0">
              <option value="">Pilih Qori</option> 
              <option v-for="(src, qari) in selectedSurat?.audioFull" :key="qari" :value="qari">
                {{ qariList[qari] || `Qari ${qari}` }}
              </option>
            </select>
            <!-- <p>Selected Qari: {{ selectedQari }}</p> -->
          </div>
          <audio ref="audioPlayer"></audio>
        </div>
        <!-- Daftar Ayat -->
        <div class="overflow-y-auto h-[60vh] no-scrollbar mt-4">
          <div v-for="ayat in selectedSurat.ayat" 
               :key="ayat.nomorAyat" 
               :id="`ayat-${selectedSurat.nomorSurat}-${ayat.nomorAyat}`" 
               class="mb-4">

            <div class="bg-white transition-all duration-300 p-4 rounded-2xl bg-gray-10">
              <!-- Ayat dalam Bahasa Arab -->
              <p class="text-right arabic-text" :style="{ fontSize: fontSize + 'px' }">
                {{ ayat.teksArab }}
              </p>
            
              <!-- Teks Latin (Selalu Ada, Bisa Disembunyikan) -->
              <p v-if="!hideLatin" class="text-green-400">
                <em>{{ ayat.teksLatin }}</em>
              </p>
            
              <!-- Terjemahan (Selalu Ada, Bisa Disembunyikan) -->
              <div v-if="!hideTranslation">
                <h1 class="my-5">Artinya:</h1>
                <p>{{ getTranslation(ayat) }}</p>
              </div>
            
              <!-- Tombol Putar Audio -->
              <div class="flex gap-5 items-center">
                <button @click="playAyat(ayat.audio[selectedQari])" 
                        class="bg-green-400 p-2 rounded-xl cursor-pointer my-3 hover:bg-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24"
                       style="fill: rgba(255, 255, 255, 1)">
                    <path d="M7 6v12l10-6z"></path>
                  </svg>
                </button>

                <button @click="toggleBookmark(ayat)" 
                        class="cursor-pointer bg-green-400 p-2 rounded-xl my-3 hover:bg-blue-400">
                  <svg class="size-6" xmlns="http://www.w3.org/2000/svg" 
                       viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    

      <!-- Jika tidak ada surat yang dipilih -->
      <div v-else class=" text-center w-full">
        <!-- <video autoplay loop muted src="../assets/img/animasi.gif"></video> -->
        <img class="-mt-15 md:hidden object-cover w-full" src="../assets/img/ramadanbaru.png" alt="">
        <div>
          <h1 class="md:hidden text-center text-3xl font-bold py-1">Qur'anLynxx</h1>
          <div>
            <p class="text-justify md:w-200 hidden">Assalamu'alaikum! Selamat datang di Qur'anLynxx. 'Dan sesungguhnya telah Kami mudahkan Al-Qur'an untuk pelajaran, maka adakah orang yang mau mengambil pelajaran?' (QS. Al-Qamar: 17). Mari mendekatkan diri kepada Allah melalui kalam-Nya.</p>
            <img src="../assets/img/logoquran2.png" class="md:hidden w-200" alt="" data-aos="zoom-in" data-aos-duration="900">
            <h1 class=" text-center text-3xl py-1 font-light lg:hidden">{{ $t('ucapan')}}</h1>
            <div class="md:hidden">
              <p>{{ $t('ucapan2')}}</p>
              <p>{{ $t('ucapan3')}}</p>
              <!-- <p>Mohon Maaf Lahir dan Batin, Semoga Allah SWT Menerima Amal Ibadah Kita</p> -->
            </div>
          </div>

          <div class="bg- shadow-2xl lg:flex gap-40 p-8 rounded-lg hidden justify-center">
            <div @click="" class="items-center flex flex-col cursor-pointer">
              <img src="../assets/img/alquran.svg" alt="">
              <h1>Al-Qur'an</h1>
            </div>
            <div @click="" class="items-center flex flex-col cursor-pointer">
              <img src="../assets/img/tahlil.svg" alt="">
              <h1>Yasin</h1>
            </div>
            <div @click="doa()" class="items-center flex flex-col cursor-pointer">
              <img src="../assets/img/doa.svg" alt="">
              <h1>Doa</h1>
            </div>
          </div>

          <div>
            <div class="hidden md:block">
              <!-- Bagian Surah Favorit -->
              <h1 class="py-5 text-center text-xl font-bold">Surah Favorit</h1>
              <div class="flex gap-4 justify-center flex-wrap">
                <div 
                  v-for="surah in surahList" 
                  :key="surah.nomor" 
                  class="border px-5 py-2 rounded-full cursor-pointer hover:bg-gray-100 hover:text-green-400 transition"
                  @click="selectSurah(surah.nomor)"> 
              
                  <button class="hover:text-green-400 cursor-pointer">{{ surah.nama }}</button>
                </div>
              </div>
            </div>
          </div>

          <!-- EVENT -->
          <div class="hidden md:block overflow-x-auto w-full p-6 bg-white bg-border-100 my-5 rounded-lg shadow-md">
            
            <h1 class="text-xl font-bold mb-10">Akan Datang</h1>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div
                v-for="(event, index) in events"
                :key="index"
                class="flex flex-col items-center bg-white animate-pulse bg-gray-10 p-5 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img class="w-24 h-24 rounded-2xl object-cover" :src="event.image" :alt="event.title" />
                <h1 class="mt-3 text-lg font-semibold">{{ event.title }}</h1>
              </div>
            </div>
          </div>

          <div class="p-3 w-full hidden md:block">
          <ul v-if="bookmarks.length > 0" class="lg:flex lg:flex-wrap md:grid md:grid-cols-3 gap-3 justify-center">
            <li v-for="(ayat, index) in bookmarks" :key="index" 
                class=" p-3 rounded-lg shadow-lg  transition-all cursor-pointer 
                       w-40 h-40 md:w-48 md:h-48 lg:w-45 lg:h-25 flex flex-col justify-between items-center overflow-hidden"
                @click="goToAyat(ayat.nomorSurah, ayat.nomorAyat)">
          
              <!-- Nama Surah -->
              <div class="w-full text-center items-center flex">
                <p class=" text-xs font-medium truncate text-start w-full">{{ ayat.namaSurah }}</p>
                <button @click.stop="removeBookmark(index)" 
                        class="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path>
                  </svg>
                </button>
              </div>
            
              <!-- Ayat Arab -->
              <div class="flex-1 flex items-center justify-center w-full overflow-hidden">
                <p class="text-lg  font-bold text-center truncate-left w-full">{{ ayat.teksArab }}</p>
              </div>
            
              <!-- Tombol Hapus -->
            </li>
          </ul>
        
          <p v-else class="text-gray-500 text-center mt-2 text-sm">Belum ada yang disimpan</p>
          </div>
        </div>
      </div>

      <div v-if="IsOpenDes && selectedSurat && selectedSurat.deskripsi" class="fixed lg:left-140 lg:top-60 w-full lg:w-223 left-0 p-5">
        <div class="flex justify-between bg-gray-500 bg-border-100 rounded-t-2xl p-5 items-center transition-all duration-300">
          <h1 class="text-xl font-bold text-center text-white">{{ selectedSurat.namaLatin }}</h1>
          <svg @click="openDes" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
        </div>
        <div class=" bg-gray-10 bg-gray-300 rounded-b-2xl p-5 transition-all duration-300 overflow-y-auto h-[300px] md:h-50">
          <p v-html="selectedSurat.deskripsi" class="text-sm text-gray text-justify w-full lg:w-200"></p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="fixed bottom-0 w-full bg-white text-black bg-border-100 text-gray transition-all duration-300 text-center py-2">
      <p>Copyright 2025</p>
    </footer>

    <div class="fixed md:hidden lg:hidden bottom-5 left-6 z-50">
      <button class="bg-green-500 p-4 rounded-full" @click="openSurat">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          style="fill: rgba(255, 255, 255, 1)"
        >
          <path
            d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 6h14v2H5zm2-4h10v2H7z"
          ></path>
        </svg>
        <!-- <svg v-else="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg> -->
      </button>
    </div>

    <!-- MOBILE SURAH -->
     <main v-if="IsSurah">

       <div
         class="fixed w-full p-3 top-25 backdrop:blur-2xl"
         data-aos="fade-up"
         data-aos-duration="500"
       >
         <div class="bg-white bg-border-100 md:hidden lg:hidden w-full lg:w-1/3 transition-all duration-300 text-black text-gray overflow-y-auto h-[83vh] lg:h-[80vh] rounded-2xl p-4 no-scrollbar">
           <div class="flex justify-between items-center" >
             <svg @click="openSurat" class="size-7 my-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
             <svg @click="openBookMark" class="size-6 my-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path></svg>
           </div>
           <div class="mb-4">
             <div class="items-center flex py-2 bg-gray-800 px-4 rounded-full border border-gray-600">
               <input
                 class="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                 type="text"
                 :placeholder="$t('cari')"
                 v-model="localSearchQuery"
                 @input="updateParentSearch"
               />
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
                 height="20"
                 viewBox="0 0 24 24"
                 class="text-white"
               >
                 <path
                   d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
                 ></path>
               </svg>
             </div>
           </div>
           <ul>
             <li
               v-for="item in filteredSurat"
               :key="item.nomor"
               @click="setActiveSurah(item.nomor)"
               :class="{ active: selectedSurah === item.nomor }"
               class="cursor-pointer p-3 bg-white shadow bg-gray-10 transition-all duration-300 rounded-2xl mb-2 hover:bg-green-700 "
             >
             <strong>{{ convertToArabic(item.nomor) }}. {{ item.namaLatin }}</strong>
               <div class="flex justify-between">
                 <span dir="rtl">{{ item.nama }}</span>
                 <span>{{ item.jumlahAyat }} Ayat</span>
               </div>
             </li>
           </ul>
         </div>
        </div>
        <div v-if="isMarkOpen" class="fixed p-3 top-80 md:block  w-full">
          <div class=" w-full bg-white bg-border-100 rounded-2xl shadow-2xl" data-aos="fade-up" data-aos-duration="500">
            <svg @click="openBookMark" class="size-7 pt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
              <h1 class="text-xl font-bold text-center mb-3">{{ $t('simpan') }}</h1>
    
              <ul v-if="bookmarks.length > 0" class="flex flex-wrap md:grid md:grid-cols-3 gap-3 justify-center">
                <li v-for="(ayat, index) in bookmarks" :key="index" 
                    class=" p-3 rounded-lg shadow-lg  transition-all cursor-pointer 
                           w-40 h-40 md:w-48 md:h-48 lg:w-45 lg:h-25 flex flex-col justify-between items-center overflow-hidden"
                    @click="goToAyat(ayat.nomorSurah, ayat.nomorAyat)">
              
                  <!-- Nama Surah -->
                  <div class="w-full text-center items-center flex">
                    <p class=" text-xs font-medium truncate text-start w-full">{{ ayat.namaSurah }}</p>
                    <button @click.stop="removeBookmark(index)" 
                            class="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition">
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path>
                      </svg>
                    </button>
                  </div>
                
                  <!-- Ayat Arab -->
                  <div class="flex-1 flex items-center justify-center w-full overflow-hidden">
                    <p class="text-lg  font-bold text-center truncate-left w-full">{{ ayat.teksArab }}</p>
                  </div>
                
                  <!-- Tombol Hapus -->
                </li>
              </ul>
            
              <p v-else class="text-gray-500 h-screen text-center mt-2 text-sm">{{ $t('note') }}</p>
          </div>
        </div>
     </main>

    <!-- MOBILE BOOKMARK -->
  </main>
</template>

<script>
import axios from 'axios'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Swal from 'sweetalert2';

import img1 from '../assets/img/avatar.avif'
import img2 from '../assets/img/avatar (2).avif'
import img3 from '../assets/img/avatar (1).avif'
import img4 from '../assets/img/iklan.png'
export default {
  props: {
    sidebarOpen: Boolean,
    isDark: Boolean,
    searchQuery: {
      type: String,
      default: ''
    }
  },
  components: { DotLottieVue },
  data() {
    return {
      quran: [],
      selectedSurat: null,
      selectedQari: '',
      IsSetting: false,
      isMarkOpen: false,
      fontSize: 32,
      isLatin: false,
      bookmarks: [],
      isBookmarked: false,
      isTranslationOn: false,
      selectedLanguage: "id",
      hideLatin: false, 
      hideTranslation: false,
      currentAudio: null,
      IsSurah: false,
      IsOpenDes: false,
      localSearchQuery: '',
      selectedSurah: null,
      qariList: {
        '00': 'Pilih Qari',
        '01': 'Abdullah Al-Juhany',
        '02': 'Abdul-Muhsin Al-Qasim',
        '03': 'Abdurrahman As-Sudais',
        '04': 'Ibrahim Al-Dossari',
        '05': 'Misyari Rasyid Al-Afasi',
      },
      languages: [
        { value: "id", label: "Bahasa Indonesia" },
        { value: "ar", label: "العربية" },
      ],
      surahList: [  // Daftar surah favorit
        { nomor: 36, nama: "Yasin", tempatTurun: "Mekah", jumlahAyat: 83 },
        { nomor: 1, nama: "Al-Fatihah", tempatTurun: "Mekah", jumlahAyat: 7 },
        { nomor: 55, nama: "Ar-Rahman", tempatTurun: "Madinah", jumlahAyat: 78 },
        { nomor: 67, nama: "Al-Mulk", tempatTurun: "Mekah", jumlahAyat: 30 },
        { nomor: 18, nama: "Al-Kahf", tempatTurun: "Mekah", jumlahAyat: 110 }
      ],
      events: [
        { title: "Mindful Fasting", image: img1 },
        { title: "Iron Healing", image: img2 },
        { title: "Ramadan", image: img3 },
        { title: "Tuntunan Sholat", image: img4 },
      ],
    }
  },
  computed: {
    filteredSurat() {
      const query = (this.searchQuery || this.localSearchQuery || '').toLowerCase();
      
      if (!query) return this.quran;
      
      return this.quran.filter(
        (item) =>
          item.namaLatin.toLowerCase().includes(query) || 
          item.nama.toLowerCase().includes(query) ||
          item.nomor.toString().includes(query)
      )
    },
  },
  watch: {
    // Watch searchQuery dari props untuk menyinkronkan dengan lokalSearchQuery
    searchQuery: {
      immediate: true,
      handler(newVal) {
        this.localSearchQuery = newVal;
      }
    },
    "selectedSurat.audioFull": {
    immediate: true, // Jalankan saat data pertama kali dimuat
    handler(newAudioFull) {
      if (newAudioFull && Object.keys(newAudioFull).length > 0) {
        this.selectedQari = Object.keys(newAudioFull)[0]; // Ambil key pertama
      } else {
        this.selectedQari = ""; // Reset ke kosong jika tidak ada data
      }
    },
  },
  },
  mounted() {
    if (this.selectedSurat?.audioFull) {
      const firstQari = Object.keys(this.selectedSurat.audioFull)[0];
      if (firstQari) {
        this.selectedQari = firstQari;
      }
    }
    this.getAllSurat();
    
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      this.localSearchQuery = savedSearch;
      this.$emit('update-search', savedSearch);
    }
    // if (localStorage.getItem("peringatan_disetujui") === "true") {
    //   this.Peringatan = false;
    // }
    this.loadBookmarks();
  },
  methods: {
  selectSurah(nomor) {
    this.selectedSurah = this.surahList.find(surah => surah.nomor === nomor);
  },
    openBookMark() {
      this.isMarkOpen = !this.isMarkOpen;
    },
    doa() {
      window.location.href = "/doa";
    },
    loadBookmarks() {
  this.bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
},

toggleBookmark(ayat) {
  console.log("Toggling bookmark for:", ayat.namaLatin, ayat.nomorSurah, ayat.nomorAyat);
  
  const currentBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  console.log("Current bookmarks:", currentBookmarks);
  
  const nomorSurah = Number(ayat.nomorSurah);
  const nomorAyat = Number(ayat.nomorAyat);
  
  const existingBookmarkIndex = currentBookmarks.findIndex(
    bookmark => Number(bookmark.nomorSurah) === nomorSurah && 
               Number(bookmark.nomorAyat) === nomorAyat
  );
  
  console.log("Existing bookmark index:", existingBookmarkIndex);
  
  let updatedBookmarks = [...currentBookmarks];
  
  if (existingBookmarkIndex === -1) {
    updatedBookmarks.push({
      id: `${nomorSurah}-${nomorAyat}`,
      nomorSurah: this.selectedSurat.nomorSurat, 
      namaSurah: this.selectedSurat.namaLatin,
      nomorAyat: nomorAyat,
      namaLatin: ayat.namaLatin,
      teksArab: ayat.teksArab,
      teksLatin: ayat.teksLatin,
      timestamp: Date.now()
    });
    // alert('Disimpan')
    Swal.fire({
      title: this.$t('alter.alter6'),
      text: this.$t('alter.alter4'),
      icon: 'success',
      confirmButtonText: 'Oke'
    })
    console.log("Added new bookmark");
  } else {
    updatedBookmarks.splice(existingBookmarkIndex, 1);
    console.log("Removed existing bookmark");
  }
  
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  this.bookmarks = updatedBookmarks;
  
  console.log("Updated bookmarks:", this.bookmarks);
},

removeBookmark(index) {
  const updatedBookmarks = [...this.bookmarks];
  updatedBookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  this.bookmarks = updatedBookmarks;
},

goToAyat(nomorSurah, nomorAyat) {
  console.log("Mencoba menuju ayat:", { nomorSurah, nomorAyat });

  if (!nomorSurah || !nomorAyat) {
    console.error("nomorSurah atau nomorAyat tidak valid!", { nomorSurah, nomorAyat });
    return;
  }

  this.showSurah(nomorSurah).then(() => {
    this.scrollToAyat(nomorSurah, nomorAyat);
  });
},

  showSurah(nomorSurah) {
    return new Promise((resolve) => {
      this.selectedSurah = nomorSurah;
      this.showSurahDetail = true;

      this.$nextTick(() => {
        setTimeout(resolve, 300);
      });
    });
  },

  scrollToAyat(nomorSurah, nomorAyat) {
  if (!nomorSurah || !nomorAyat) {
    console.error("nomorSurah atau nomorAyat tidak valid!");
    return;
  }

  const ayatElement = document.getElementById(`ayat-${nomorSurah}-${nomorAyat}`);
  
  if (ayatElement) {
    ayatElement.scrollIntoView({ behavior: "smooth", block: "center" });
    ayatElement.classList.add("bg-yellow-200");
    
    setTimeout(() => {
      ayatElement.classList.remove("bg-yellow-200");
    }, 2000);
  } else {
    console.error(`Ayat dengan ID 'ayat-${nomorSurah}-${nomorAyat}' tidak ditemukan!`);
  }
},
    getTranslation(ayat) {
      if (this.selectedLanguage === "id") return ayat.teksIndonesia;
      if (this.selectedLanguage === "en") return ayat.teksEnglish || "Translation not available";
      if (this.selectedLanguage === "ar") return ayat.teksArab || "الترجمة غير متوفرة";
      if (this.selectedLanguage === "zh") return ayat.teksChinese || "翻译不可用";
      return ayat.teksIndonesia;
  },
    openSetting() {
      this.IsSetting = !this.IsSetting;
    },
    setujuiPeringatan() {
      if (this.toggle) {
        localStorage.setItem("peringatan_disetujui", "true");
        this.Peringatan = false; 
      } else {
        // alert($t('alter.alter3'));
        Swal.fire ({
          title: "Warning",
          text: this.$t('alter.alter3')
        })
      }
    },
    togglePeringatan() {
      this.Peringatan = false
    },
    convertToArabic(number) {
      return number.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    },
    openDes() {
      this.IsOpenDes = !this.IsOpenDes;
    },
    updateParentSearch() {
      this.$emit('update-search', this.localSearchQuery);
      localStorage.setItem("searchQuery", this.localSearchQuery);
    },
    setActiveSurah(nomor) {
      this.selectedSurah = nomor; 
      this.getSuratDetail(nomor);
      this.IsSurah = false; // Tutup mobile surah setelah pilih
    },
    openSurat() {
      this.IsSurah = !this.IsSurah
    },
    async getAllSurat() {
      try {
        const response = await axios.get('https://equran.id/api/v2/surat')
        this.quran = response.data.data
        if (this.localSearchQuery && this.filteredSurat.length > 0) {
        }
      } catch (error) {
        console.error('Error fetching daftar surat:', error)
      }
    },

    async getSuratDetail(nomorSurat) {
      try {
        const response = await axios.get(`https://equran.id/api/v2/surat/${nomorSurat}`);
        this.selectedSurat = response.data.data;

        this.selectedQari = ""; 
      } catch (error) {
        console.error("Error fetching detail surat:", error);
      }
    },



    updateAudioSource() {
      if (this.selectedSurat && this.selectedSurat.audioFull) {
        this.$refs.audioPlayer.src = this.selectedSurat.audioFull[this.selectedQari];
      }
    },
    playAudio() {
      if (!this.selectedQari) {
        Swal.fire({
          title: 'Qari',
          text: this.$t('alter.alter5'),
          icon: 'warning',
          confirmButtonText: 'OK'
        })
        return;
      }
      this.$refs.audioPlayer.src = this.selectedSurat.audioFull[this.selectedQari];
      this.$refs.audioPlayer.play();
    },
    playAyat(audioSrc) {
      if (this.currentAudio) {
        this.currentAudio.pause();
      }
      this.currentAudio = new Audio(audioSrc);
      this.currentAudio.play();
    },
  },
}
</script>

<style scope>
.surat-item {
  cursor: pointer;
  padding: 5px;
}
.arabic-text {
  font-size: 24px;
  font-family: 'Amiri', serif;
}
.play-button {
  background-color: #28a745;
  color: white;
  margin-top: 2vh;
  width: 5vh;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
}
.play-button:hover {
  background-color: #218838;
}
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.active {
  border: 1px solid white;
  background-color: #28a745 !important; /* Warna hijau aktif */
  color: white;
  font-weight: bold;
}

 video {
    mix-blend-mode: multiply;
  }


.kedip {
  animation: kedip 1s;
}

@keyframes kedip {
  0% {
    opacity: 0;
  } 
  100% {
    opacity: 100%;
    }
}
.truncate-left {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
  text-align: right;
}

</style>