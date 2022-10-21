<script>
    import { push } from 'svelte-spa-router'
    import fastapi from "../lib/api"
    import Error from "../components/Error.svelte"
    import { access_token, username, is_login } from "../lib/store"

    let error = {detail:[]}
    let login_username = ""
    let login_password = ""

    function login(event) {
        event.preventDefault()
        let url = "/api/user/login"
        let params = {
            username: login_username,
            password: login_password,
        }
        fastapi('login', url, params, 
            (json) => {
                $access_token = json.access_token
                $username = json.username
                $is_login = true
                push("/")
            },
            (json_error) => {
                error = json_error
            }
        )
    }
</script>

<div class="container">
    <h5 class="my-3 border-bottom pb-2">로그인</h5>
    <Error error={error} />
    <form method="post">
        <div class="mb-3">
            <label for="username">사용자 이름</label>
            <input type="text" class="form-control" id="username" bind:value="{login_username}">
        </div>
        <div class="mb-3">
            <label for="password">비밀번호</label>
            <input type="password" class="form-control" id="password" bind:value="{login_password}">
        </div>
        <button type="submit" class="btn btn-primary" on:click="{login}">로그인</button>
    </form>
</div>