<script>
    export let error  // 전달받은 오류
</script>

{#if typeof error.detail === 'string'}
    <ul>
        <li>{error.detail}</li>
    </ul>
{:else if typeof error.detail === 'object' && error.detail.length > 0 }
    <ul>
        {#each error.detail as err, i}
        <li>
            <strong>{err.loc[1]}</strong> : {err.msg}
        </li>
        {/each}
    </ul>
{/if}
