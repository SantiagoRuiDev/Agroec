<template>
  <div class="content w-full mx-auto grid my-5 gap-2">
    <div
      class="border-2 w-11/12 mx-auto rounded grid items-center relative h-12 text-gray-500 md:w-1/3"
    >
      <input
        placeholder="Filtrar por ID"
        class="text-left text-sm md:text-md bg-transparent h-full p-2"
      />
      <div class="absolute right-1 top-2.5">
        <img
          src="@/assets/Search.svg"
          alt="Search by Comerciante"
          class="h-6 w-6"
        />
      </div>
    </div>
    
    <div class="grid gap-1">
      <RouterLink to="/status">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2">
          <div class="flex w-full gap-3">
            <div class="Order grid items-center text-center">
              <img
                src="@/assets/Products/Corn.svg"
                alt="Orden Icon"
                class="h-16 w-16 mx-auto"
              />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-sm font-bold">Orden #345</h1>
              <h1 class="text-gray-600 text-xs font-bold">
                Maiz Duro Amarillo
              </h1>
              <p class="text-gray-500 text-xs">Cant: 200qq</p>
              <p class="text-gray-500 text-xs">24/12/2023</p>
            </div>
          </div>

          <div class="Order-Price text-right grid mt-2 justify-end">
            <h1 class="text-yellow-400 text-md font-bold">$17.50</h1>
            <h1 class="text-yellow-400 text-md font-bold">QQ</h1>
            <p class="text-lime text-xs font-bold">Pagado</p>
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/status">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2">
          <div class="flex w-full gap-3">
            <div class="Order grid items-center text-center">
              <img
                src="@/assets/Products/Cacao.svg"
                alt="Orden Icon"
                class="h-16 w-16 mx-auto"
              />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-sm font-bold">Orden #346</h1>
              <h1 class="text-gray-600 text-xs font-bold">Cacao</h1>
              <p class="text-gray-500 text-xs">Cant: 200qq</p>
              <p class="text-gray-500 text-xs">24/12/2023</p>
            </div>
          </div>

          <div class="Order-Price text-right grid mt-2 justify-end">
            <h1 class="text-yellow-400 text-md font-bold">$17.50</h1>
            <h1 class="text-yellow-400 text-md font-bold">QQ</h1>
            <p class="text-lime text-xs font-bold">Pagado</p>
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/status">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2">
          <div class="flex w-full gap-3">
            <div class="Order grid items-center text-center">
              <img
                src="@/assets/Products/Corn.svg"
                alt="Orden Icon"
                class="h-16 w-16 mx-auto"
              />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-sm font-bold">Orden #347</h1>
              <h1 class="text-gray-600 text-xs font-bold">
                Maiz Duro Amarillo
              </h1>
              <p class="text-gray-500 text-xs">Cant: 200qq</p>
              <p class="text-gray-500 text-xs">24/12/2023</p>
            </div>
          </div>

          <div class="Order-Price text-right grid mt-2 justify-end">
            <h1 class="text-yellow-400 text-md font-bold">$17.50</h1>
            <h1 class="text-yellow-400 text-md font-bold">QQ</h1>
            <p class="text-lime text-xs font-bold">Pagado</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>

  <RouterLink to="/print" class="rounded-full p-3 h-14 w-14 dark-bar grid justify-items-center align-items-center absolute right-2 bottom-2">
    <img src="@/assets/Pdf.svg" alt="Plus Icon" />
  </RouterLink>
</template>
