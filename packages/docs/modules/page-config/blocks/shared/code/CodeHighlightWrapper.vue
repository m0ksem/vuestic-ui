<script lang="ts">
import { defineComponent, h, computed, ref, watch, onMounted } from 'vue'

import { createHighlighter } from 'shiki'
import { useAppGlobal, watchAsync } from 'vuestic-ui';
import { Highlighter } from 'shiki';

export default defineComponent({
  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'javascript',
    }
  },

  async setup(props, { attrs }) {
    const shiki = await useAppGlobal('shiki-highlighter', async () => ({
      highlighter: await createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: ['javascript', 'typescript', 'vue', 'css', 'html', 'markdown', 'sass', 'json', 'bash']
        }),
    }))

    const languageName = computed(() => props.lang || 'javascript')
    const html = ref('')

    const { currentPresetName, colors } = useColors()

    watchAsync(
      [() => props.code, languageName, currentPresetName],
      async (isCancelled) => {
        const result = await shiki.value.highlighter?.codeToHtml(props.code, {
          lang: languageName.value,
          theme: currentPresetName.value === 'dark' ? 'github-dark' : 'github-light',
        })

        if (isCancelled()) {
          return
        }

        html.value = result ?? ''
      },
      { immediate: true }
    )

    return () => h('div', { class: 'shiki-container' }, [
      h('div', {
        innerHTML: html.value,
      }),
    ])
  }
})
</script>

<style lang="scss">
.shiki-container {
  padding: 0.75rem 1.5rem;

  .shiki {
    background: transparent !important;
  }

  code {
    display: block !important;
  }

  * {
    font-family: monospace;
  }
}
</style>
