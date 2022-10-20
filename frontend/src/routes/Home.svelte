<script>
    import fastapi from "../lib/api"
    let question_list = []

    function get_question_list() {
        fastapi('get', '/api/question/list', {}, (json) => {
            question_list = json
        })
    }

    get_question_list()
</script>

<ul>
    {#each question_list as question}
        <li>{question.subject}</li>
    {/each}
</ul>