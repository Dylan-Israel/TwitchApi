$(document).ready(() => {
    const deletedFollowers = ['brunofin', 'comster404'];

    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/streams/freecodecamp',
        headers: {
            'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
        },
        success: (data1) => {
            if (data1.stream === null) {
                $('#fccStatus').html('Free Code Camp is currently OFFLINE');
            } else {
                $('#fccStatus').html('Free Code Camp is currently LIVE');
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/',
        headers: {
            'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
        },
        success: (data2) => {
            for (let i = 0; i < data2.follows.length; i++) {
                const displayName = data2.follows[i].channel.display_name;
                const logo = data2.follows[i].channel.logo;
                const status = data2.follows[i].channel.status;
                const missingLogoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g';
              
                logo === null ? missingLogoUrl : logo;
                
                prependFollowerInfo(displayName, logo, status);
            }
        }
    });


    for (let i = 0; i < deletedFollowers.length; i++) {
        $.ajax({
            type: 'GET',
            url: `https://api.twitch.tv/kraken/streams/${deletedFollowers[i]}`,
            headers: {
                'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
            },
            error: (data3) => {
                const logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g';
                const displayName = data3.statusText;
                const status = data3.status;

                prependFollowerInfo(displayName, logo, status);
            }
        });
    }

    function prependFollowerInfo(displayName, logo, status) {
        $('#followerInfo').prepend(`<div class ='row'><div class='col-md-4'>
                <a href='https://www.twitch.tv/${displayName}'><img src='${logo}'></a>
                    </div><div class='col-md-4'>${displayName}</div><div class='col-md-4'>${status}</div></div>`);
    }

});