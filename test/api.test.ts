import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';
import axios, { AxiosResponse } from 'axios';
const BEFORE_ALL_TIMEOUT = 30000; // 30 sec
import brandy from "../src/data/brandy.json"
import django from "../src/data/django.json"

/*
test('create and delete session', async () => 
{
    var id = "0"
    var res = await axios({
        url: 'http://127.0.0.1:5000/post/session',
        method: 'post',
        timeout: 8000,
    })

    id = res.data["general"].split(" ")[res.data["general"].split(" ").length - 1]
    expect(res.status).toBe(201)

    res = await axios({
        url: 'http://127.0.0.1:5000/post/session',
        method: 'post',
        timeout: 8000,
    })
    expect(res.status).toBe(201)

    expect ( () =>
        axios({
            url: 'http://127.0.0.1:5000/delete/session/500',
            method: 'delete',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')
    

    res = await axios({
        url: 'http://127.0.0.1:5000/delete/session/'+id,
        method: 'delete',
        timeout: 8000,
    })
    expect(res.status).toBe(200)
})

test('join and leave players', async () => 
{
    var id = "0"
    var res = await axios({
        url: 'http://localhost:5000/post/session',
        method: 'post',
        timeout: 8000,
    })

    id = res.data["general"].split(" ")[res.data["general"].split(" ").length - 1]
    expect(res.status).toBe(201)

    res = await axios({
        url: 'http://localhost:5000/session/join/'+id+'/14',
        method: 'put',
        timeout: 8000,
    })
    expect(res.status).toBe(201)

    res = await axios({
        url: 'http://localhost:5000/session/join/'+id+'/15',
        method: 'put',
        timeout: 8000,
    })
    expect(res.status).toBe(201)
    
    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/join/'+id+'/14',
            method: 'put',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 406')
    
    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/leave/'+id+'/16',
            method: 'delete',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')

    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/leave/'+id+'/0',
            method: 'delete',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 403')
    

    res = await axios({
        url: 'http://localhost:5000/session/leave/'+id+'/14',
        method: 'delete',
        timeout: 8000,
    })
    expect(res.status).toBe(200)
    
})

test('create and delete session', async () => 
{
    var id = "0"
    var res = await axios({
        url: 'http://localhost:5000/post/session',
        method: 'post',
        timeout: 8000,
    })

    id = res.data["general"].split(" ")[res.data["general"].split(" ").length - 1]
    expect(res.status).toBe(201)

    res = await axios({
        url: 'http://localhost:5000/post/session',
        method: 'post',
        timeout: 8000,
    })
    expect(res.status).toBe(201)

    expect ( () =>
        axios({
            url: 'http://localhost:5000/delete/session/500',
            method: 'delete',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')
    

    res = await axios({
        url: 'http://localhost:5000/delete/session/'+id,
        method: 'delete',
        timeout: 8000,
    })
    expect(res.status).toBe(200)
})

test('add and delete characters', async () => 
{
    var id = "0"
    var res = await axios({
        url: 'http://localhost:5000/post/session',
        method: 'post',
        timeout: 8000,
    })

    id = res.data["general"].split(" ")[res.data["general"].split(" ").length - 1]
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/add/character/'+id,
        method: 'post',
        timeout: 8000,
        data: brandy
    })
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/add/character/'+id,
        method: 'post',
        timeout: 8000,
        data: django
    })
    expect(res.status).toBe(201)

    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/delete/character/'+id+"/"+5,
            method: 'delete',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')

    var res = await axios({
        url: 'http://localhost:5000/session/delete/character/'+id+"/"+1,
        method: 'delete',
        timeout: 8000
    })
    expect(res.status).toBe(200)
    
})

test('roll for characters', async () => 
{
    var id = "0"
    var res = await axios({
        url: 'http://localhost:5000/post/session',
        method: 'post',
        timeout: 8000,
    })

    id = res.data["general"].split(" ")[res.data["general"].split(" ").length - 1]
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/add/character/'+id,
        method: 'post',
        timeout: 8000,
        data: brandy
    })
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/add/character/'+id,
        method: 'post',
        timeout: 8000,
        data: django
    })
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/roll/'+id+"/"+0,
        method: 'get',
        timeout: 8000
    })
    expect(res.status).toBe(200)

    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/roll/'+id+"/"+2,
            method: 'get',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')

    var res = await axios({
        url: 'http://localhost:5000/session/rollstats/'+id+"/"+1+"/FUE/DFIS",
        method: 'get',
        timeout: 8000
    })
    expect(res.status).toBe(200)

    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/rollstats/'+id+"/"+1+"/FUE/NONE",
            method: 'get',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 500')

    var res = await axios({
        url: 'http://localhost:5000/session/rolldamage/'+id+'/'+1,
        method: 'get',
        timeout: 8000
    })
    expect(res.status).toBe(200)

    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/rolldamage/'+id+'/'+3,
            method: 'get',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')
    
})

test('damage and heal characters', async () => 
{
    var id = "0"
    var res = await axios({
        url: 'http://localhost:5000/post/session',
        method: 'post',
        timeout: 8000,
    })

    id = res.data["general"].split(" ")[res.data["general"].split(" ").length - 1]
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/add/character/'+id,
        method: 'post',
        timeout: 8000,
        data: brandy
    })
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/damage/'+id+'/'+0+'/'+13,
        method: 'put',
        timeout: 8000
    })
    expect(res.status).toBe(200)

    var res = await axios({
        url: 'http://localhost:5000/session/heal/'+id+'/'+0+'/'+3,
        method: 'put',
        timeout: 8000
    })
    expect(res.status).toBe(200)

    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/heal/'+id+'/'+1+'/'+3,
            method: 'put',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')

    expect ( () =>
        axios({
            url: 'http://localhost:5000/session/damage/'+id+'/'+1+'/'+3,
            method: 'put',
            timeout: 8000,
        })
    ).rejects.toThrowError('Request failed with status code 404')
})

test('order initiative', async () => 
{
    var id = "0"
    var res = await axios({
        url: 'http://localhost:5000/post/session',
        method: 'post',
        timeout: 8000,
    })

    id = res.data["general"].split(" ")[res.data["general"].split(" ").length - 1]
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/add/character/'+id,
        method: 'post',
        timeout: 8000,
        data: brandy
    })
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/add/character/'+id,
        method: 'post',
        timeout: 8000,
        data: django
    })
    expect(res.status).toBe(201)

    var res = await axios({
        url: 'http://localhost:5000/session/roll/'+id+"/"+0,
        method: 'get',
        timeout: 8000
    })
    expect(res.status).toBe(200)

    var res = await axios({
        url: 'http://localhost:5000/session/roll/'+id+"/"+1,
        method: 'get',
        timeout: 8000
    })
    expect(res.status).toBe(200)

    var res = await axios({
        url: 'http://localhost:5000/session/initiative/'+id,
        method: 'get',
        timeout: 8000
    })
    expect(res.status).toBe(200)
    
})
*/