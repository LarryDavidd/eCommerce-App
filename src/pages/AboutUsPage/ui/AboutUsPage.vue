<script setup lang="ts">
import GitHub from '@shared/ui-kit/Icons/GitHub.vue';
import RSSNewLogo from '@shared/ui-kit/Icons/RSSNewLogo.vue';
</script>

<template>
  <div class="wrapper p-4 md:px-10">
    <h2 class="text-center text-2xl font-bold">About us</h2>
    <div class="top_content mx-auto flex w-5/6 flex-col content-center items-center lg:w-full lg:flex-row">
      <div class="team_info bg-colour flex w-full items-center gap-8 rounded-md p-3 lg:w-1/2">
        <img
          src="@shared/assets/images/team.svg"
          width="100px"
          alt="team"
        />
        <p>
          We are an energetic and determined team of aspiring developers working on our first major project — an online store. Together, we have come a long way, learning and
          growing to create a convenient and functional product. Each of us has contributed uniquely, and thanks to this, our project has become a reality.
        </p>
      </div>
      <div class="mx-auto w-full p-4 lg:w-1/2">
        <div class="grid grid-cols-6 gap-4">
          <!-- first line -->
          <div class="col-span-2 flex flex-col items-center">
            <img
              src="@shared/assets/images/technologies/vue.svg"
              alt="vue"
              width="50"
            />
            <p>Vue</p>
          </div>
          <div class="col-span-2 flex flex-col items-center">
            <img
              src="@shared/assets/images/technologies/typescript.svg"
              alt="typescript"
              width="50"
            />
            <p>TypeScript</p>
          </div>
          <div class="col-span-2 flex flex-col items-center">
            <img
              src="@shared/assets/images/technologies/git.svg"
              alt="git"
              width="50"
            />
            <p>Git</p>
          </div>

          <!-- second line -->
          <div class="col-span-3 flex flex-col items-center">
            <img
              src="@shared/assets/images/technologies/tailwind.svg"
              alt="tailwind"
              width="50px"
            />
            <p>Tailwind</p>
          </div>
          <div class="col-span-3 flex flex-col items-center">
            <img
              src="../../../shared/assets/images/technologies/pinialogo.svg"
              alt="pinia"
              width="50"
            />
            <p>Pinia</p>
          </div>

          <!-- third line -->
          <div class="col-span-2 flex flex-col items-center">
            <img
              src="@shared/assets/images/technologies/storybook.svg"
              alt="storybook"
              width="50"
            />
            <p>Storybook</p>
          </div>
          <div class="col-span-2 flex flex-col items-center">
            <img
              src="@shared/assets/images/technologies/vite.svg"
              alt="vite"
              width="50"
            />
            <p>Vite</p>
          </div>
          <div class="col-span-2 flex flex-col items-center">
            <img
              src="@shared/assets/images/technologies/vue.svg"
              alt="vue router"
              width="50"
            />
            <p>Vue Router</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cards my-10 flex h-fit w-full items-stretch justify-center gap-8">
      <div class="cards__elem bg-colour flex w-64 flex-col items-center rounded-lg p-3">
        <div>
          <div class="size-32 overflow-hidden rounded-full">
            <img
              src="@shared/assets/images/zhenya.jpg"
              alt="photo"
              class="w-full -translate-y-5 scale-110"
            />
          </div>
          <h2 class="text-center font-bold">Team Lead,<br />Developer</h2>
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <p>
            <span class="font-bold">Zhenya</span> is our tireless team lead and chief integration specialist. He focused on working with commercetools and SDK, ensuring reliable
            integration of all components of our online store. Zhenya has excellent organizational skills and is always ready to help the team find the best solution for any task.
          </p>
          <a
            href="https://github.com/LarryDavidd"
            class="self-end"
            target="_blank"
            ><GitHub
          /></a>
        </div>
      </div>
      <div class="cards__elem bg-colour flex w-64 flex-col items-center rounded-lg p-3">
        <div>
          <div class="size-32 overflow-hidden rounded-full">
            <img
              src="@shared/assets/images/dasha.jpg"
              alt="photo"
              class="w-full"
            />
          </div>
          <h2 class="text-center font-bold">Developer</h2>
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <p>
            <span class="font-bold">Dasha</span> is our supersonic frontend developer. Her incredible speed and precision in completing tasks have always impressed the team. Dasha
            creates intuitive and beautiful interfaces, making our online store user-friendly. Her creative approach and attention to detail add a special charm to the project.
          </p>
          <a
            href="https://github.com/SyrtcevaDaria"
            class="self-end"
            target="_blank"
            ><GitHub
          /></a>
        </div>
      </div>
      <div class="cards__elem bg-colour flex w-64 flex-col items-center rounded-lg p-3">
        <div>
          <div class="size-32 overflow-hidden rounded-full">
            <img
              src="https://sun9-28.userapi.com/impg/ecUtR_A5XynrvxR52LTWnM_zrwE3RUmTzx1RWA/NEWux-9GkhQ.jpg?size=1617x2160&quality=95&sign=8d77b44f19b676a3f50d90a1e197c38c&type=album"
              alt="photo"
              class="w-full"
            />
          </div>
          <h2 class="text-center font-bold">Developer</h2>
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <p>
            <span class="font-bold">Polina</span> is a talented frontend developer working alongside Dasha on the visual and functional aspects of our store. Her creativity and
            technical skills help bring the boldest ideas to life, making our online store not only beautiful but also user-friendly.
          </p>
          <a
            href="https://github.com/Polina351"
            class="self-end"
            target="_blank"
            ><GitHub
          /></a>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-end">
      <a
        href="https://rs.school"
        target="_blank"
      >
        <RSSNewLogo />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-colour {
  background: rgb(240, 240, 240);
}
@media (max-width: 912px) {
  .cards {
    flex-direction: column;
    &__elem {
      flex-direction: row;
      width: 100%;
      gap: 5%;
    }
  }
}

@media (max-width: 587px) {
  .cards {
    align-items: center;
    &__elem {
      flex-direction: column;
      width: 16rem;
    }
  }
  .top_content {
    width: 100%;
  }
  .team_info {
    flex-direction: column;
    gap: 0;
  }
}
</style>
