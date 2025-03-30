<template>
  <div
    :class="{ dark: isDark }"
    class="md:min-h-screen md:bg-white md:dark:bg-gray-900 md:text-gray-900 md:dark:text-white"
  >
    <!-- Konten utama -->
    <div>
      <router-view 
        :sidebarOpen="sidebarOpen" 
        :isDark="isDark" 
        :searchQuery="searchQuery"
        @update-search="updateSearch"
      ></router-view>
    </div>
    

    <!-- Tombol Dark Mode -->
    <nav
      class="flex flex-wrap justify-between items-center lg:justify-center lg:space-x-30 md:justify-center md:space-x-10 lg:gap-5 sm:h-20 px-5 py-4 bg-white bg-border-100 text-black transition-all duration-300 text-gray shadow-2xl fixed top-0 w-full z-50"
    >
      <h2 class="font-bold text-xl md:text-2xl">Qur'anLynxx</h2>
      <div class="flex items-center space-x-10">
        <a href="/" class="hover:text-gray-300 md:flex hidden">{{ $t('menu1')}}</a>
        <a href="/doa" class="hover:text-gray-300 md:flex hidden">{{ $t('menu2')}}</a>
        <div class="items-center bg-gray-800 px-4 py-2 rounded-full border w-full hidden lg:flex border-gray-600">
          <input
            class="bg-transparent outline-none text-white placeholder-gray-400 sm:w-40"
            type="text"
            placeholder="Cari Surat..."
            v-model="searchQuery"
            @input="handleSearchInput"
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

      <!-- Peringatan -->
      <div v-if="Peringatan" class="fixed top-50 left-0 p-5 xl:left-0  w-full" data-aos="zoom-in" data-aos-duration="800">
        <div class="bg-white bg-border-100 p-5 rounded-lg shadow-lg w-full">
          <div class="py-2 flex justify-between">
            <h1 class="text-2xl text-red-500">Warning</h1>
            <svg @click="togglePeringatan" class="size-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
            </svg>
          </div>
          <Toast class="costum-toast"/>
          <div class="">
            <h1>{{ $t('sapa') }}</h1>
            <p class="">{{ $t('sapa2') }}</p>
          </div>
          
        <div class="flex gap-2 mt-3">
          <input type="checkbox" id="toggle" v-model="toggle" />
          <label for="toggle">{{ $t('sapa3') }}</label>
        </div>
        <div class="my-3 max-w-50">
          <audio ref="audioElement" :muted="false" controls class="hidden">
            <source :src="audioSrc" type="audio/mpeg">
          </audio>
        
          <label class="flex  items-center space-x-2 cursor-pointer">
            <div class="relative flex gap-5">
              <input 
                type="checkbox" 
                class="sr-only inline-flex" 
                :checked="isPlaying" 
                v-model="toggle1"
                @change="toggleAudio"
              >
              <div 
                class="w-12 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300"
                :class="{'bg-green-400': isPlaying}"
              ></div>
              <div 
                class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300"
                :class="{'translate-x-6': isPlaying}"
              ></div>
              <span>Active Audio</span>
            </div>
          </label>
        </div>
        
          <button @click="setujuiPeringatan" class="bg-green-500 text-white px-4 py-2 rounded-lg mt-3">
            {{ $t('sapa4') }}
          </button>
        </div>
      </div>


      

      <div>
        <button class="lg:hidden md:hidden " @click="toggleNavbar">
          <svg class="fill-blue-900" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
        </button>
      </div>

      <!-- Mobile -->
      <div v-if="navbarOpen">
        <main class="">
          <nav
            class="md:hidden right-0 bg-white bg-border-100 text-black transition-all duration-300 text-gray shadow-2xl fixed top-0 w-full z-50"
          >
            <div class="flex justify-between p-4">
              <div class="flex items-center gap-5 ">
                <button
                @click="toggleDarkMode"
                class="md:p-2 md:rounded-full md:bg-gray-200 md:dark:bg-gray-800 md:fixed md:z-50 md:top-7 md:right-20 md:block md:cursor-pointer md:text-black md:dark:text-white md:shadow-lg md:hover:bg-gray-300 md:dark:hover:bg-gray-700 md:transition z-50 md:w-9 right-3 md:border-0 border rounded-full p-2 top-2 shadow-2xl"
              >
                <svg
                  v-if="isDark"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 w-5 h-5 text-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 w-5 h-5 text-gray-900 dark:text-gray-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              </button>
              <div class="border p-2 rounded-full" @click="toggleOpenCS">
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.9381 8H21C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8ZM3 10V14H4V10H3ZM20 10V14H21V10H20ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path></svg>
              </div>
              </div>
              <div>
                <button class="md:hidden" @click="toggleNavbar">
                  <svg class="fill-blue-900" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col items-end p-5 gap-5">
              <a href="/" class="hover:text-gray-300 sm:block font-bold" @click="activeNabar1(index)" :class="[active1 === index ? 'text-green-500' : 'text-black text-gray'  ]" >{{ $t('menu1') }}</a>
              <a href="/doa" class="hover:text-gray-300 sm:block font-bold" @click="activeNabar(index)" :class="[active === index ? 'text-green-500' : 'text-black text-gray'  ]">{{ $t('menu2') }}</a>
              <a @click="setting" class="font-bold">{{ $t('menu3') }}</a>
              <div class="items-center justify-between flex flex-row-reverse py-2 gap-5 md:flex ">
                <!-- <input
                  class="bg-transparent outline-none text-white placeholder-gray-400 w-full sm:w-40"
                  type="text"
                  placeholder="Cari Surat..."
                  v-model="searchQuery"
                  @input="handleSearchInput"
                /> -->
                <div>
                  <audio ref="audioElement" :muted="false" controls class="hidden">
                    <source :src="audioSrc" type="audio/mpeg">
                  </audio>
                
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <div class="relative">
                      <input 
                        type="checkbox" 
                        class="sr-only" 
                        :checked="isPlaying" 
                        @change="toggleAudio"
                      >
                      <div 
                        class="w-12 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300"
                        :class="{'bg-green-400': isPlaying}"
                      ></div>
                      <div 
                        class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300"
                        :class="{'translate-x-6': isPlaying}"
                      ></div>
                    </div>
                  </label>
                </div>
                <svg @click="openSearch" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>

                <!-- Search -->
                

                <div class="relative inline-block text-left">
                  <!-- Button untuk membuka dropdown -->
                  <button @click="toggleDropdown" class="flex items-center gap-2 p-2 border rounded-lg">
                    <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path>
                    </svg>
                    <span>{{ getCurrentLanguage }}</span>
                  </button>
                
                  <!-- Dropdown menu -->
                  <div v-if="isOpen" class="absolute right-0 mt-2 w-40 bg-white bg-border-100 text-gray text-black border rounded-lg shadow-lg">
                    <button @click="changeLanguage('id')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      🇮🇩 Indonesia
                    </button>
                    <button @click="changeLanguage('en')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      🇬🇧 English
                    </button>
                    <button @click="changeLanguage('jp')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      🇯🇵 日本語
                    </button>
                    <button @click="changeLanguage('zh')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      🇨🇳 中文 
                    </button>
                    <button @click="changeLanguage('ko')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      🇰🇷 한국어
                    </button>
                  </div>
              </div>
              </div>
            </div>
            <div v-if="IsSearch" class="relative px-5 py-2 kedip">
                  <input
                    class="bg-transparent outline-none border p-1 rounded-2xl pl-2 text-white placeholder-gray-400 w-full sm:w-40"
                    type="text"
                    maxlength="15"
                    :placeholder="$t('cari')"
                    v-model="searchQuery"
                    @input="handleSearchInput"
                  />
                </div>


            <!-- CS -->
            <div v-if="IsCS" class="fixed -mt-60 w-full p-5" data-aos="zoom-in" data-aos-duration="500">
              <div class="bg-border-100 bg-white shadow-2xl p-5 rounded-2xl">
                <svg @click="toggleOpenCS" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                </svg>
                <h1 class="text-center text-2xl my-5">{{ $t('text1')}}</h1>
                <form @submit.prevent class="flex flex-col gap-4">
                  <label>{{ $t('text2') }}</label>
                  <input type="text" v-model="nama" :placeholder="$t('text2')" required class="p-2 outline-none border rounded-xl">
                
                  <label>{{ $t('text3') }}</label>
                  <div class="flex gap-5">
                    <div class="gap-2 flex">
                      <input type="radio" v-model="laporan" value="Saran" required>
                      <label>{{ $t('select.saran') }}</label>
                    </div>
                    <div class="gap-2 flex">
                      <input type="radio" v-model="laporan" value="Kritik" required>
                      <label>{{ $t('select.kritik') }}</label>
                    </div>
                    <div class="gap-2 flex">
                      <input type="radio" v-model="laporan" value="Pertanyaan" required>
                      <label>{{ $t('select.pertanyaan') }}</label>
                    </div>
                  </div>
                
                  <textarea v-model="saran" maxlength="255" :placeholder="$t('placeholder.laporan')" required class="resize-none h-30 outline-none border rounded-xl"></textarea>
                
                  <!-- Input Email (Selalu Muncul dengan Catatan) -->
                  <div>
                    <label>{{ $t('text4') }}<span class="text-red-500">({{ $t('text5') }})</span></label>
                    <input type="email" v-model="email" :placeholder="$t('placeholder.email')" class="p-2 outline-none border rounded-xl w-full" required>
                  </div>
                
                  <!-- Tombol Pilihan Kirim -->
                  <div class="flex gap-4">
                    <!-- <button @click="kirimWhatsApp" class="bg-green-400 p-3 rounded-xl text-black hover:text-white flex gap-2 text-lg items-center hover:bg-green-300 w-full">
                      <svg class="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.25361 18.4944L7.97834 18.917C9.18909 19.623 10.5651 20 12.001 20C16.4193 20 20.001 16.4183 20.001 12C20.001 7.58172 16.4193 4 12.001 4C7.5827 4 4.00098 7.58172 4.00098 12C4.00098 13.4363 4.37821 14.8128 5.08466 16.0238L5.50704 16.7478L4.85355 19.1494L7.25361 18.4944ZM2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22ZM8.39232 7.30833C8.5262 7.29892 8.66053 7.29748 8.79459 7.30402C8.84875 7.30758 8.90265 7.31384 8.95659 7.32007C9.11585 7.33846 9.29098 7.43545 9.34986 7.56894C9.64818 8.24536 9.93764 8.92565 10.2182 9.60963C10.2801 9.76062 10.2428 9.95633 10.125 10.1457C10.0652 10.2428 9.97128 10.379 9.86248 10.5183C9.74939 10.663 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.40738 11.0473 9.44455 11.1944C9.45903 11.25 9.50521 11.331 9.54708 11.3991C9.57027 11.4368 9.5918 11.4705 9.60577 11.4938C9.86169 11.9211 10.2057 12.3543 10.6259 12.7616C10.7463 12.8783 10.8631 12.9974 10.9887 13.108C11.457 13.5209 11.9868 13.8583 12.559 14.1082L12.5641 14.1105C12.6486 14.1469 12.692 14.1668 12.8157 14.2193C12.8781 14.2457 12.9419 14.2685 13.0074 14.2858C13.0311 14.292 13.0554 14.2955 13.0798 14.2972C13.2415 14.3069 13.335 14.2032 13.3749 14.1555C14.0984 13.279 14.1646 13.2218 14.1696 13.2222V13.2238C14.2647 13.1236 14.4142 13.0888 14.5476 13.097C14.6085 13.1007 14.6691 13.1124 14.7245 13.1377C15.2563 13.3803 16.1258 13.7587 16.1258 13.7587L16.7073 14.0201C16.8047 14.0671 16.8936 14.1778 16.8979 14.2854C16.9005 14.3523 16.9077 14.4603 16.8838 14.6579C16.8525 14.9166 16.7738 15.2281 16.6956 15.3913C16.6406 15.5058 16.5694 15.6074 16.4866 15.6934C16.3743 15.81 16.2909 15.8808 16.1559 15.9814C16.0737 16.0426 16.0311 16.0714 16.0311 16.0714C15.8922 16.159 15.8139 16.2028 15.6484 16.2909C15.391 16.428 15.1066 16.5068 14.8153 16.5218C14.6296 16.5313 14.4444 16.5447 14.2589 16.5347C14.2507 16.5342 13.6907 16.4482 13.6907 16.4482C12.2688 16.0742 10.9538 15.3736 9.85034 14.402C9.62473 14.2034 9.4155 13.9885 9.20194 13.7759C8.31288 12.8908 7.63982 11.9364 7.23169 11.0336C7.03043 10.5884 6.90299 10.1116 6.90098 9.62098C6.89729 9.01405 7.09599 8.4232 7.46569 7.94186C7.53857 7.84697 7.60774 7.74855 7.72709 7.63586C7.85348 7.51651 7.93392 7.45244 8.02057 7.40811C8.13607 7.34902 8.26293 7.31742 8.39232 7.30833Z"></path></svg>
                      Kirim
                    </button> -->
                    <button @click="kirimEmail" class="bg-green-400 p-3 text-center justify-center rounded-xl text-black hover:text-white hover:bg-blue-300 w-full flex items-center gap-2 text-lg">
                      <!-- <svg class="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"></path></svg> -->
                      {{ $t('kirim') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- Dark Mode Mobile -->
            
          </nav>
        </main>
      </div>
      <main class="md:flex md:gap-5 items-center hidden ">
        <div class="relative md:inline-block hidden text-left">
           <!-- Button untuk membuka dropdown -->
           <button @click="toggleDropdown" class="flex items-center gap-2 p-2 border rounded-lg">
             <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path>
             </svg>
             <span>{{ getCurrentLanguage }}</span>
           </button>
        
           <!-- Dropdown menu -->
           <div v-if="isOpen" class="absolute right-0 mt-2 w-40 bg-white bg-border-100 text-gray text-black border rounded-lg shadow-lg">
             <button @click="changeLanguage('id')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
               🇮🇩 Indonesia
             </button>
             <button @click="changeLanguage('en')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
               🇬🇧 English
             </button>
             <button @click="changeLanguage('jp')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
               🇯🇵 日本語
             </button>
             <button @click="changeLanguage('zh')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
               🇨🇳 中文 
             </button>
             <button @click="changeLanguage('ko')" class="block w-full px-4 py-2 text-left hover:bg-gray-100">
               🇰🇷 한국어
             </button>
           </div>
          </div>
  
  
          <div class="p-4 hidden md:flex">
      <audio ref="audioElement" :muted="muted" controls class="hidden">
        <source :src="audioSrc" type="audio/mpeg">
      </audio>

      <label class="flex items-center space-x-2 cursor-pointer">
        <div class="relative">
          <input 
            type="checkbox" 
            class="sr-only"
            :checked="isPlaying"
            @change="toggleAudio"
          >
          <div 
            class="w-12 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300"
            :class="{'bg-green-400': isPlaying}"
          ></div>
          <div 
            class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300"
            :class="{'translate-x-6': isPlaying}"
          ></div>
        </div>
      </label>
    </div>
        <button
          @click="toggleDarkMode"
          class="md:p-2 md:mr-7 lg:mr-0 md:rounded-full md:bg-gray-200 md:dark:bg-gray-800  md:z-50 md:top-5  md:right-20 sm:flex sm:items-center hidden md:block md:cursor-pointer md:text-black md:dark:text-white md:shadow-lg md:hover:bg-gray-300 md:dark:hover:bg-gray-700 md:transition z-50 md:w-9 right-3 md:border-0 border rounded-full p-2 top-2 shadow-2xl"
        >
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 w-5 h-5 text-yellow-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 w-5 h-5 text-gray-900 dark:text-gray-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </button>
      </main>
    </nav>
  </div>

  <!-- coba -->
  <div>
    
  </div>
</template>

<script>
import Toast from "primevue/toast";
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';
import audiolink from './assets/takbir/takbiran1new.mp3'
export default {
  components: { Toast },
  data() {
    return {
      navbarOpen: false,
      audioSrc: audiolink,
      sidebarOpen: false,
      active: null,
      isPlaying: false,
      isMuted: false,
      active1: null,
      audioElement: null,
      isPlaying: false,
      Peringatan: true,
      muted: false,
      isPlaying: false,
      toggle: false,
      isOpen: false,
      IsCS: false,
      IsSearch: false,
      nama: "",
      laporan: "",
      saran: "",
      email: "",
      kirimViaEmail: false,
      isDark: false,
      searchQuery: '',
    };
  },
  created() {
    // Cek status dark mode dari localStorage
    this.isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", this.isDark);
    
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      this.searchQuery = savedSearch;
    }

    this.$router.beforeEach((to, from, next) => {
      next();
    });

    const savedLang = localStorage.getItem('lang') || 'en';
    this.$i18n.locale = savedLang;
  },

  computed: {
    getCurrentLanguage() {
    if (this.$i18n.locale === 'id') {
      return '🇮🇩';
    } else if (this.$i18n.locale === 'jp') {
      return '🇯🇵';
    } else if (this.$i18n.locale === 'zh') {
      return '🇨🇳';
    } else if (this.$i18n.locale === 'ko') {
      return '🇰🇷';
    } else {
      return '🇬🇧';
    }
  }
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.audioElement.volume = 1.0; // Sesuaikan volume
      this.loadAudioState();
    });

    if (localStorage.getItem("peringatan_disetujui") === "true") {
      this.Peringatan = false;
    }

  },
  methods: {
    setujuiPeringatan() {
      if (this.toggle && this.toggle1) {
        localStorage.setItem("peringatan_disetujui", "true");
        this.Peringatan = false; 
      } else {
        this.$toast.add({
          severity: "info",
          summary: "Warning",
          detail: "Harap centang & Activekan Audio",
          life: 3000,
        });
        // Swal.fire ({
        //   title: "Warning",
        //   text: this.$t('alter.alter3')
        // })
      }      
    },
    togglePeringatan() {
      if (this.isPlaying) {
        this.Peringatan = false
      } else {
        this.Peringatan = true
        Swal.fire({
          text: this.$t('alter.alter7'),
        })
      }
      // this.Peringatan = false
    },
    toggleAudio() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.$refs.audioElement.play();
      } else {
        this.$refs.audioElement.pause();
      }
      this.saveAudioState();
    },
    saveAudioState() {
      localStorage.setItem('audioState', JSON.stringify({ isPlaying: this.isPlaying }));
    },
    loadAudioState() {
      const savedState = JSON.parse(localStorage.getItem('audioState'));
      if (savedState && savedState.isPlaying) {
        this.isPlaying = true;
        this.$refs.audioElement.play();
      }
    },
    openSearch() {
      this.IsSearch = !this.IsSearch;
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
      this.isOpen = false; // Tutup dropdown setelah memilih
    },
    activeNabar(index) {
      this.active === index ? this.active = null : this.active = index;
    },
    activeNabar1(index) {
      this.active1 === index ? this.active1 = null : this.active1 = index;
    },
    toggleKirimEmail() {
      this.kirimViaEmail = !this.kirimViaEmail;
    },

    // Kirim ke WhatsApp
    kirimWhatsApp() {
      if (!this.nama || !this.laporan || !this.saran) {
        alert("Harap isi semua field sebelum mengirim pesan ke WhatsApp!");
        return;
      }
    
      const nomorWA = "6282253355239";
      const pesan = `Halo, saya ${this.nama}%0A
      Saya ingin memberikan ${this.laporan}%0A
      Pesan: ${this.saran}`;
    
      const url = `https://wa.me/${nomorWA}?text=${pesan}`;
      window.open(url, "_blank");
    },
    // Kirim ke Email
    kirimEmail() {
      // if (!this.email) {
      //   alert("Silakan masukkan email terlebih dahulu!");
      //   return;
      // }

      const templateParams = {
        nama: this.nama,
        laporan: this.laporan,
        saran: this.saran,
        to_email: this.email, 
      };

      emailjs.send("service_ebjayh8", "template_41a44cj", templateParams, "7wiZbaFh4es1X-W2c")
        .then(() => {
          Swal.fire ({
            title: "Berhasil!",
            text: "Email telah dikirim!",
            icon: "success",
            timer: 2000,
            confirmButtonText: 'Ok'
          })
          this.kirimViaEmail = false; 
        })
        .catch((error) => {
          console.error("Gagal mengirim email", error);
        });
    },
    setting() {
      Swal.fire({
        title: this.$t('alter.alter2'),
        text: this.$t('alter.alter1'),
        icon: "info",
        confirmButtonText: "OK",
      });
    },
    toggleOpenCS() {
      this.IsCS = !this.IsCS;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    toggleDarkMode() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", this.isDark);
    },
    handleSearchInput() {
      // Simpan di localStorage dan emit ke komponen anak
      localStorage.setItem("searchQuery", this.searchQuery);
      this.$root.$emit('search-updated', this.searchQuery);
    },
    updateSearch(value) {
      // Memperbarui searchQuery dari komponen anak
      this.searchQuery = value;
      localStorage.setItem("searchQuery", value);
      // Broadcast to all components
      this.$root.$emit('search-updated', value);
    }
  },
};
</script>