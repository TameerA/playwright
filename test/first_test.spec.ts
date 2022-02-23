import {test, expect,Browser,firefox, Page} from '@playwright/test';
import { Wait } from 'playright/dist/wait';
import axios from 'axios';
import qs from 'qs';








test.describe('All tests @run', async () => {

  
  test.beforeEach(async ({page}) => {

    const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
    await test.step('log in',async () => {
      await page.goto('https://doenel-nel.voc.dev.ridewithvia.com/route_editor');
      await page.fill('id=login.email-field', 'admin@ridewithvia.com');
      await page.fill('id=login.password-field', 'Pa55word?');
      await page.click('text=LOGIN');
      await page.locator('text="Welcome to Via Operations Center"');
      await page.waitForSelector('text="Welcome to Via Operations Center"');
      await test.step('click route editor', async () => {
      await page.click('id=route-editor-menu-item');
      await mainFrame.locator('div[class="voc-hub-jss72 voc-hub-jss74"]').waitFor();
    
     });
    });
    
    
  });

  test.afterEach(async ({page}) => {

  await test.step('log out', async () => {
     await page.waitForTimeout(300);
     await page.click('div[data-testid="rider-contact-details"]');
     await page.waitForSelector('text="Logout"');
     //await page.waitForTimeout(4000);
     await page.click('li[aria-label="logout-button"]');
    });
  });
  
////////////AAAAAPPPPPPPIIIII////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

  async function getID2(url1:string,headers1,data1,id,{page})
  {
    var  ids :string;
    var idstop;
    const mainFrame = await page.frameLocator('iframe[title="route-editor"]');

       const response = await axios({method: 'post',url: url1,data:data1,headers:headers1}
      ).then(function (req) {
         
        var arr: Array<object>;
        var i=0;
         //var temp:Pokedex;
         var temp ;
         temp=req.data;
         var length = Object.values(temp.data).length;
     console.log("get2 ids: "+id);
      for(var j=0; j<length;j++)
      {
        if(Object.values(temp.data)[j]['stops']){
       for(var i=0; i<Object.values(temp.data)[j]['stops'].length; i++)
       {

           idstop= (Object.values(temp.data)[j]['stops'][i]['passThroughId']);
           if(idstop != null){
              ids= "div"+"[id="+'"'+String(idstop)+'"'+"]";
              
              if(ids.localeCompare(id) !=0 &&  Object.values(temp.data)[j]['stops'][i]['stopType']!= "school_stop") 
              {
                console.log("???????????");
                 return ids;
              }
         }
       }
      
      }

    }
   
      });
   return ids;   
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////

async function getIDstop(url1:string,headers1,data1,{page})
{
  var  ids :string;
  var idstop;
  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');

     const response = await axios({method: 'post',url: url1,data:data1,headers:headers1}
    ).then(function (req) {
       
      var arr: Array<object>;
      var i=0;
       //var temp:Pokedex;
       var temp ;
       temp=req.data;
       var length = Object.values(temp.data).length;
    for(var j=0; j<length;j++)
    {
      if(Object.values(temp.data)[j]['stops']){
     for(var i=0; i<Object.values(temp.data)[j]['stops'].length; i++)
     {

         idstop= (Object.values(temp.data)[j]['stops'][i]['passThroughId']);
         if(idstop != null){
            ids= "div"+"[id="+'"'+String(idstop)+'"'+"]";
              //console.log("???????????");
               return ids;
       }
     }
    
    }

  }
 
    });
 return ids;   
}



//////////////////////////////////////////////////////////////////////////////////////////////////////
  async function getID(url1:string,headers1,data1)
  {
    var  ids :string;
    var idstop;


       const response = await axios({method: 'post',url: url1,data:data1,headers:headers1}
      ).then(function (req) {
         
        var arr: Array<object>;
        var i=0;
         //var temp:Pokedex;
         var temp ;
         temp=req.data;
         var length = Object.values(temp.data).length;
     
      for(var j=0; j<length;j++)
      {
        if(Object.values(temp.data)[j]['stops']){
       for(var i=0; i<Object.values(temp.data)[j]['stops'].length; i++)
       {
         if(Object.values(temp.data)[j]['stops'][i]['tasks'].length> 0)
         {
          
           idstop= (Object.values(temp.data)[j]['stops'][i]['passThroughId']);
           if(idstop != null){
            break;
  
           }
         }
       }
      
      }
      if(idstop != null){
        break;
  
       }
         
      }
    
      })
  
       ids = "div"+"[id="+'"'+String(idstop)+'"'+"]";
       //console.log("ids111:   "+ids  );
       return ids;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


  async function getEmptyRouteName(url1:string,headers1,data1)
{
  var routename:string;
  var route;
  
     const response = await axios({method: 'post',url: url1,data:data1,headers:headers1}
    ).then(function (req) {
       
      var arr: Array<object>;
      var i=0;
       //var temp:Pokedex;
       var temp ;
       temp=req.data;
       //var routename:string;


       var length = Object.values(temp.data).length;
   
    for(var j=0; j<length;j++)
    {
      if(Object.values(temp.data)[j]['stops'].length<1){
         //'text="QG6345_To School"'
        route=Object.values(temp.data)[j]['lineName'];
        //ids = "div"+"[id="+'"'+String(idstop)+'"'+"]";
       // routename="'"+'"'+"text"+routename+'"'+"'";
       routename="text"+"="+'"'+String(route)+'"';
        //console.log("gettt: "+routename);
       return routename;
        break;
        }
    }
   // return routename;

    })
    return routename;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//status==1 not empty route
//status!=1 empty route
async function getRouteName(url1:string,headers1,data1,status)
{
  var routename:string;
  //routename="";
  var route;
  
     const response = await axios({method: 'post',url: url1,data:data1,headers:headers1}
    ).then(function (req) {
       
      var arr: Array<object>;
      var i=0;
       //var temp:Pokedex;
       var temp ;
       temp=req.data;
       //var routename:string;


    var length = Object.values(temp.data).length;

    if(status == 1)
    {
      for(var j=0; j<length;j++)
      {
        if(Object.values(temp.data)[j]['stops'].length>0){
           //'text="QG6345_To School"'
          route=Object.values(temp.data)[j]['lineName'];
          //ids = "div"+"[id="+'"'+String(idstop)+'"'+"]";
         // routename="'"+'"'+"text"+routename+'"'+"'";
         routename="text"+"="+'"'+String(route)+'"';
          //console.log("gettt: "+routename);
         return routename;
          break;
          }
          //return routename
      }
      return routename
      console.log("for: "+routename);
    }
else{
    for(var j=0; j<length;j++)
    {
      if(Object.values(temp.data)[j]['stops'].length<1){
         //'text="QG6345_To School"'
        route=Object.values(temp.data)[j]['lineName'];
        //ids = "div"+"[id="+'"'+String(idstop)+'"'+"]";
       // routename="'"+'"'+"text"+routename+'"'+"'";
       routename="text"+"="+'"'+String(route)+'"';
        //console.log("gettt: "+routename);
       return routename;
        break;
        }
    }
    return routename;
  }
    //return routename;
   // return routename
    })
    return routename;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getNONEmptyRouteName(url1:string,headers1,data1)
{
  var routename:string;
  var route;
  
     const response = await axios({method: 'post',url: url1,data:data1,headers:headers1}
    ).then(function (req) {
       
      var arr: Array<object>;
      var i=0;
       //var temp:Pokedex;
       var temp ;
       temp=req.data;
       //var routename:string;


       var length = Object.values(temp.data).length;
   
    for(var j=0; j<length;j++)
    {
      if(Object.values(temp.data)[j]['stops'].length>0){
         //'text="QG6345_To School"'
        route=Object.values(temp.data)[j]['lineName'];
        //ids = "div"+"[id="+'"'+String(idstop)+'"'+"]";
       // routename="'"+'"'+"text"+routename+'"'+"'";
       routename="text"+"="+'"'+String(route)+'"';
        //console.log("gettt: "+routename);
       return routename;
        break;
        }
    }
   // return routename;

    })
    return routename;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
test('Test 1', async ({page}) => {


  var schoolAddress2;
  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  var newschoolname= "556688";
  newschoolname="text"+"="+'"'+newschoolname+'"';
  var numberstopsbefore;

  await test.step('lick plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
   // await page.waitForTimeout(6000);
   })

   await test.step('click threeDots Button',async () => {
  
    const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
    await threeDotsButton.click();
    //await page.waitForTimeout(5000);
   })
    
  
   await test.step('click createStop button',async () => {
  
    const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
    //await page.waitForTimeout(3000);
    await createStopBtn.click();
   // await page.waitForTimeout(5000);
   })


   await test.step('insert stop address', async () => {

    numberstopsbefore = await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
    await page.mouse.click(276,390);
    await page.waitForTimeout(7000);
   // await mainFrame.locator('text="SAVE"').waitFor();
   })

   await test.step('click school address', async () => {

    // await page.waitForTimeout(6000);
     const schoollist = mainFrame.locator('text="School Name"');
     await schoollist.click();
    })
 
 
    await test.step('choose school', async () => {
     const school = await mainFrame.locator(newschoolname);
     //await page.waitForTimeout(1000);
     await school.click();
     await mainFrame.locator('text="Stop have to connect to school"').waitFor();
     await mainFrame.locator('text="SAVE"').waitFor();
      
    })


  await test.step('get the name of the address', async () => {

  var schooladdress = mainFrame.locator('div[class="fleet-prebooking-fe-MuiAutocomplete-root fleet-prebooking-fe-MuiAutocomplete-hasPopupIcon"]').innerHTML();
  var s = (await schooladdress).toString();
  let array:Array<String>=s.split('=') ;
  console.log("//"+array[9]);
  var len=array[9].length;
  console.log("111: "+array[9])
  schoolAddress2=array[9].substring(1,len-4)
  console.log("st::: "+schoolAddress2);
  await page.waitForTimeout(2000);
    
  });

await test.step('click save', async ()=> {

  await mainFrame.locator('text="SAVE"').click();

  await mainFrame.locator('text="Properties"').waitFor();
  await page.waitForTimeout(17000);

})

await test.step('open Unrouted Stops List', async () => {

  await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();


  //await mainFrame.locator('text="Unrouted Stops"').waitFor();
  await page.waitForTimeout(9000);
  console.log("new: "+newschoolname);

  
});

await test.step('check if we added the stop', async () => {

  //await mainFrame.locator('text="556688"').nth(0).click();

  var stopAddressIsVisible = await mainFrame.locator(newschoolname).nth(0).isVisible();
  expect(stopAddressIsVisible).toBeTruthy();

 var routeButtonIsEnabled = await  mainFrame.locator('span[class="voc-hub-MuiButton-endIcon voc-hub-MuiButton-iconSizeSmall"]').nth(0).isEnabled();
 expect(routeButtonIsEnabled).toBeTruthy();
  console.log("finish");
  await page.waitForTimeout(3000);

  
  schoolAddress2 = "text"+"="+schoolAddress2;
  var  schoolAddressIsVisible = await mainFrame.locator(schoolAddress2).nth(1).isVisible();
  expect(schoolAddress2).toBeTruthy();
 
})

await test.step('exit from Unrouted Stops List', async () => {

  await mainFrame.locator('path[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]').click();
})


/////MAP VIEW //////////////
await test.step('click Map View', async () => {

  await mainFrame.locator('svg[color="#00BAEE"]').click();
})


await test.step('click threeDots Button',async () => {
  
  const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
  await threeDotsButton.click();
  //await page.waitForTimeout(5000);
 })
  

 await test.step('click createStop button',async () => {

  const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
  //await page.waitForTimeout(3000);
  await createStopBtn.click();
 // await page.waitForTimeout(5000);
 })


 await test.step('insert stop address', async () => {

  numberstopsbefore = await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
  await page.mouse.click(276,390);
  await page.waitForTimeout(7000);
 // await mainFrame.locator('text="SAVE"').waitFor();
 })

 await test.step('click school address', async () => {

  // await page.waitForTimeout(6000);
   const schoollist = mainFrame.locator('text="School Name"');
   await schoollist.click();
  })


  await test.step('choose school', async () => {
   const school = await mainFrame.locator(newschoolname);
   //await page.waitForTimeout(1000);
   await school.click();
   await mainFrame.locator('text="Stop have to connect to school"').waitFor();
   await mainFrame.locator('text="SAVE"').waitFor();
    
  })


await test.step('get the name of the address', async () => {

var schooladdress = mainFrame.locator('div[class="fleet-prebooking-fe-MuiAutocomplete-root fleet-prebooking-fe-MuiAutocomplete-hasPopupIcon"]').innerHTML();
var s = (await schooladdress).toString();
let array:Array<String>=s.split('=') ;
console.log("//"+array[9]);
var len=array[9].length;
console.log("111: "+array[9])
schoolAddress2=array[9].substring(1,len-4)
console.log("st::: "+schoolAddress2);
await page.waitForTimeout(7000);
  
});

await test.step('click save', async ()=> {

await mainFrame.locator('text="SAVE"').click();
await mainFrame.locator('text="Properties"').waitFor();
})

await test.step('open Unrouted Stops List', async () => {

await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();
//await mainFrame.locator('text="Unrouted Stops"').waitFor();
});

await test.step('check if we added the stop', async () => {

  //await mainFrame.locator('text="556688"').nth(0).click();

  console.log("!!@@: "+newschoolname);

  var stopAddressIsVisible = await mainFrame.locator(newschoolname).nth(0).click();
  //expect(stopAddressIsVisible).toBeTruthy();

 var routeButtonIsEnabled = await  mainFrame.locator('span[class="voc-hub-MuiButton-endIcon voc-hub-MuiButton-iconSizeSmall"]').nth(0).isEnabled();
 expect(routeButtonIsEnabled).toBeTruthy();
  console.log("finish");
  await page.waitForTimeout(3000);

  
  schoolAddress2 = "text"+"="+schoolAddress2;
  var  schoolAddressIsVisible = await mainFrame.locator(schoolAddress2).nth(1).isVisible();
  expect(schoolAddress2).toBeTruthy();
 
})


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('Test 2', async ({page}) => {


  var schoolAddress2;
  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  var newschoolname= "556688";
  newschoolname="text"+"="+'"'+newschoolname+'"';
  var numberstopsbefore;


  await test.step('lick plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
   // await page.waitForTimeout(6000);
   })

   await test.step('click threeDots Button',async () => {
  
    const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
    await threeDotsButton.click();
    //await page.waitForTimeout(5000);
   })
    
  
   await test.step('click createStop button',async () => {
  
    const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
    //await page.waitForTimeout(3000);
    await createStopBtn.click();
   // await page.waitForTimeout(5000);
   })


   await test.step('insert stop address', async () => {

    numberstopsbefore = await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
    await page.mouse.click(250,350);
    await page.waitForTimeout(7000);
   // await mainFrame.locator('text="SAVE"').waitFor();
   })

   await test.step('click school address', async () => {

    // await page.waitForTimeout(6000);
     const schoollist = mainFrame.locator('text="School Name"');
     await schoollist.click();
    })
 
 
    await test.step('choose school', async () => {
     const school = await mainFrame.locator(newschoolname);
     //await page.waitForTimeout(1000);
     await school.click();
     await mainFrame.locator('text="Stop have to connect to school"').waitFor();
     await mainFrame.locator('text="SAVE"').waitFor();
      
    })


  await test.step('get the name of the address', async () => {

  var schooladdress = mainFrame.locator('div[class="fleet-prebooking-fe-MuiAutocomplete-root fleet-prebooking-fe-MuiAutocomplete-hasPopupIcon"]').innerHTML();
  var s = (await schooladdress).toString();
  let array:Array<String>=s.split('=') ;
  console.log("//"+array[9]);
  var len=array[9].length;
  console.log("111: "+array[9])
  schoolAddress2=array[9].substring(1,len-4)
  console.log("st::: "+schoolAddress2);
  await page.waitForTimeout(2000);
    
  });

await test.step('click save', async ()=> {

  await mainFrame.locator('text="SAVE"').click();

  await mainFrame.locator('text="Properties"').waitFor();
  await page.waitForTimeout(7000);

})

await test.step('open Unrouted Stops List', async () => {

  await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();
  //await mainFrame.locator('text="Unrouted Stops"').waitFor();
  await page.waitForTimeout(9000);
  console.log("new: "+newschoolname);

  
});

await test.step('check if we added the stop', async () => {

  //await mainFrame.locator('text="556688"').nth(0).click();

  var stopAddressIsVisible = await mainFrame.locator(newschoolname).nth(0).isVisible();
  expect(stopAddressIsVisible).toBeTruthy();

 var routeButtonIsEnabled = await  mainFrame.locator('span[class="voc-hub-MuiButton-endIcon voc-hub-MuiButton-iconSizeSmall"]').nth(0).isEnabled();
 expect(routeButtonIsEnabled).toBeTruthy();
  console.log("finish");
  await page.waitForTimeout(3000);

  
  schoolAddress2 = "text"+"="+schoolAddress2;
  var  schoolAddressIsVisible = await mainFrame.locator(schoolAddress2).nth(1).isVisible();
  expect(schoolAddress2).toBeTruthy();
 
})


await test.step("3 Dots", async () => {
  
  await mainFrame.locator('div[class="sc-cIsjWt TWexk"]').nth(0).click();
  await mainFrame.locator('div[class="sc-OnmeF cVwuBC"]').nth(4).click();
  await page.waitForTimeout(9000);


})


await test.step("check if the stop is GE", async () => {

  var ge = await mainFrame.locator("text=GE").isVisible();
  expect(ge).toBeTruthy();

  var line = await mainFrame.locator('img[class="sc-eqGige hFQCXH"]').isVisible();
  expect(line).toBeTruthy();
})

await test.step("checkthe stop  with no assigned students.",async () => {

  var pickups = await mainFrame.locator('div[class="sc-bkypNX dxMphi"]').nth(0).innerText();
  console.log("P= "+pickups);

  var dropoffs = await mainFrame.locator('div[class="sc-bkypNX dxMphi"]').nth(1).innerText();
  console.log("d= "+dropoffs);

  var temp=0;
  if(pickups.localeCompare("0")==0 && dropoffs.localeCompare("0")==0)
  {
    temp = 1;
  }

  expect(temp).toEqual(1);
})

});



//////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Test 13:Using the timeline, users should be able to select a student and move their assignment from one stop to another.', async ({page}) => {

    const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
    var pickupsnumber1Number;
    var dropoffs1Number;
    var pickupsnumber2Number;
    var dropoffs2Number;
    var  ids :string;
    var  idsSecond :string;
    var url2: string;
    var headers;
    var data ;
  
  
   await test.step('click plan view', async () => {
  
    await mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor();
    //await page.waitForTimeout(2000);
   });
  
 
  //chose a nonEmpty Stop////////////////////
  
  await test.step('chose a nonEmpty Stop', async () => {
  
     url2=  'https://int.us1.dev.ridewithvia.com/voc/live-view-be/trips'
    headers = {
      'authority':'int.us1.dev.ridewithvia.com',
      'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      'x-via-city-id':'297',
      'x-via-node-port-prefix':'300',
      'x-via-city-short-name':'nel',
      'sec-ch-ua-mobile':'?0',
      'authorization':'BYPASS_AUTH',
      //'authorization':'eyJraWQiOiJWSVg4MWR3ZGh4d09DYWVqV2hRTDlpeWRXQ1Z3Ymh3ZjNMRElpMkNhUVlBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJjdXN0b206cm9sZXMiOiJBZ2VudF9PcGVyYXRpb25zX1ZPQ0FkbWluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX202VTBxVUpTTSIsImNvZ25pdG86dXNlcm5hbWUiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJhdWQiOiIzb3ZsdjNiYWdncWsxMnRwYW12c3JyZWIwdiIsImV2ZW50X2lkIjoiNDhlY2Q4N2UtNmUxMi00YWM3LWJlYjItM2ZmZmUwMGZhMDUyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDQzMzE3OTksIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY0NDM5NTM4MSwiaWF0IjoxNjQ0MzkxNzgxLCJmYW1pbHlfbmFtZSI6IlZpYSIsImVtYWlsIjoiYWRtaW5AcmlkZXdpdGh2aWEuY29tIn0.oqczMRxIl-Wif3q5ApoVqsmLZE0iz419-N1la05tK_KWUVH7iXbspYwtMQ8lc5vuFQJbQkgH2wGaHErm8vn8x-yNqjDWvhk-opp3XRFSxGkiOcSt0f-0JMRFn9MFjqHWA2hMisUdMdDlQVr0l2_C-oJlZp1XCgGqORtQVlNRVYXHRoP6Q7VXIRrzs3s4tF7khpM359bgNNLJ2iQVUSFb0B2b1IRbuUffZVntrxvbchxp58e3t64ZVUzfvUsMadNbEH271w5lzt-7kvk8tWvvZ3mnBZ7fU8K9ofsuX_EnLja5TkfdcYd7KVM-vGFiyHi_2gVjSshUdT6Hb1H-dG4whg',
      'auth':'undefined',
      'content-type':'application/json',
      'accept':'application/json, text/plain, */*',
      'x-via-environment':'doenel',
      'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36',
      'x-via-service-provider-name':'doenel',
      'origin':'https://doenel-nel.voc.dev.ridewithvia.com',
      'sec-fetch-site':'same-site',
      'sec-fetch-mode':'cors',
      'sec-fetch-dest':'empty',
      'referer':'https://doenel-nel.voc.dev.ridewithvia.com/',
      'accept-language':'en-US,en;q=0.9'
  }
  
   data ={"city_id":297,"city_short_name":"nel","tenant_id":"doenel","start_ts":2018840400,"end_ts":2018926799,"vendors":"[\"*\"]","serviceTags":"[\"*\"]","direction":"[\"*\"]"};
  
     ids=await getID(url2,headers,data);
     await mainFrame.locator(ids).click();
     var t = await mainFrame.locator('text="Properties"');
     await t.waitFor();
   });

  
  await test.step('open the menu of the student', async () => {
  
     await mainFrame.locator('span[role="button"]').nth(1).click();
     
  });
  
  
  //Reassign to different stop
  
  await test.step('click Reassign to different stop', async () => {
  
    await mainFrame.locator('text="Reassign to different stop"').click();
  });
  
  
  await test.step('select Manually', async () => {
  
    await mainFrame.locator('text="Manually"').click();
    await mainFrame.locator('text="Next"').waitFor();
  })
  
  await test.step('click Next',  async () => {
  
  await mainFrame.locator('text="Next"').click();
  const t= await mainFrame.locator('text="Unrouted Stops"');
  await t.waitFor();
  await page.waitForTimeout(1000);
  });
  

  
  await test.step('choose a stop', async () => {
  
  
    idsSecond = await getID2(url2,headers,data,ids,{page});
    console.log("/////"+idsSecond);
    await mainFrame.locator(idsSecond).click();
   
    console.log("ids:"+ids);
    console.log("idsSecond: "+idsSecond);
    var t = await mainFrame.locator('text="Properties"');
    await t.waitFor();
    //await page.waitForTimeout(3000);
    var pickupsnumber1 = await mainFrame.locator('div[class="sc-hqGPoI faVGTG"]').nth(0).innerText();
    var dropoffs1 = await mainFrame.locator('div[class="sc-hqGPoI faVGTG"]').nth(1).innerText();
  
     pickupsnumber1Number= Number(pickupsnumber1);
     dropoffs1Number=Number(dropoffs1);
    console.log("befor: ")
    await console.log("pick 111: "+pickupsnumber1);
    await console.log("drop1111: "+dropoffs1);


  });
  
  


  await test.step('click save button', async () => {
  
     const save=mainFrame.locator('text="SAVE"');
    await save.click();
    await mainFrame.locator('div[class="voc-hub-jss72 voc-hub-jss74"]').waitFor();
    await page.waitForTimeout(5000);
    var v = await mainFrame.locator('text="Student(s) assigned"');
    await v.waitFor();  
    });
  
  
  //check if we add the student ///////////////////
  
  await test.step('reload the page', async () => {
    await page.reload();
    await page.waitForTimeout(1000)
    //await page.reload();
    await page.reload();
    var t = await mainFrame.locator('svg[color="#8C8C8C"]');
    await t.waitFor();
  });
  
  await test.step('click plan view', async () => {
  
    await mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor();
   });
  
    await test.step('choose a stop', async () => {
    await mainFrame.locator(idsSecond).click();
    var pickupsnumber2 = await mainFrame.locator('div[class="sc-hqGPoI faVGTG"]').nth(0).innerText();
    var dropoffs2 = await mainFrame.locator('div[class="sc-hqGPoI faVGTG"]').nth(1).innerText();
    pickupsnumber2Number= Number(pickupsnumber2);
    dropoffs2Number=Number(dropoffs2);
    console.log("after: ");
    await console.log("pick 111: "+pickupsnumber2);
    await console.log("drop1111: "+dropoffs2);
  
  var temp= 1;
  if(pickupsnumber2Number == pickupsnumber1Number && dropoffs2Number == dropoffs1Number)
  {
    temp=0;
  }
    
  expect(temp).toEqual(1);
  
  });
  
  });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('test 15:add stop to emptay route', async ({page}) => {

  var url: string;
  var headers;
  var data ;
  url=  'https://int.us1.dev.ridewithvia.com/voc/live-view-be/trips'
  headers = {
    'authority':'int.us1.dev.ridewithvia.com',
    'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    'x-via-city-id':'297',
    'x-via-node-port-prefix':'300',
    'x-via-city-short-name':'nel',
    'sec-ch-ua-mobile':'?0',
    'authorization':'BYPASS_AUTH',
    //'authorization':'eyJraWQiOiJWSVg4MWR3ZGh4d09DYWVqV2hRTDlpeWRXQ1Z3Ymh3ZjNMRElpMkNhUVlBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJjdXN0b206cm9sZXMiOiJBZ2VudF9PcGVyYXRpb25zX1ZPQ0FkbWluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX202VTBxVUpTTSIsImNvZ25pdG86dXNlcm5hbWUiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJhdWQiOiIzb3ZsdjNiYWdncWsxMnRwYW12c3JyZWIwdiIsImV2ZW50X2lkIjoiNDhlY2Q4N2UtNmUxMi00YWM3LWJlYjItM2ZmZmUwMGZhMDUyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDQzMzE3OTksIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY0NDM5NTM4MSwiaWF0IjoxNjQ0MzkxNzgxLCJmYW1pbHlfbmFtZSI6IlZpYSIsImVtYWlsIjoiYWRtaW5AcmlkZXdpdGh2aWEuY29tIn0.oqczMRxIl-Wif3q5ApoVqsmLZE0iz419-N1la05tK_KWUVH7iXbspYwtMQ8lc5vuFQJbQkgH2wGaHErm8vn8x-yNqjDWvhk-opp3XRFSxGkiOcSt0f-0JMRFn9MFjqHWA2hMisUdMdDlQVr0l2_C-oJlZp1XCgGqORtQVlNRVYXHRoP6Q7VXIRrzs3s4tF7khpM359bgNNLJ2iQVUSFb0B2b1IRbuUffZVntrxvbchxp58e3t64ZVUzfvUsMadNbEH271w5lzt-7kvk8tWvvZ3mnBZ7fU8K9ofsuX_EnLja5TkfdcYd7KVM-vGFiyHi_2gVjSshUdT6Hb1H-dG4whg',
    'auth':'undefined',
    'content-type':'application/json',
    'accept':'application/json, text/plain, */*',
    'x-via-environment':'doenel',
    'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36',
    'x-via-service-provider-name':'doenel',
    'origin':'https://doenel-nel.voc.dev.ridewithvia.com',
    'sec-fetch-site':'same-site',
    'sec-fetch-mode':'cors',
    'sec-fetch-dest':'empty',
    'referer':'https://doenel-nel.voc.dev.ridewithvia.com/',
    'accept-language':'en-US,en;q=0.9'
}

 data ={"city_id":297,"city_short_name":"nel","tenant_id":"doenel","start_ts":2018840400,"end_ts":2018926799,"vendors":"[\"*\"]","serviceTags":"[\"*\"]","direction":"[\"*\"]"};
 const mainFrame = await page.frameLocator('iframe[title="route-editor"]');

  await test.step('click plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
   // await page.waitForTimeout(9000);
   })

 
  await test.step('choose a emptay route', async () => {

   var routename:string;
   routename = (await getEmptyRouteName(url,headers,data));
   console.log("routname: "+routename);
    await mainFrame.locator(routename).click();
    await mainFrame.locator('text="Properties"').waitFor();
   // await page.waitForTimeout(9000);
  })
 
 
  await test.step('get a number of stops before addiding', async () => {

    var numstring = (await mainFrame.locator('div[class="sc-bQduHL jjaLSj"]>div[class="sc-cmthru rCyVP"]').textContent()).toString();
    var numberbefor:number=+numstring;
    console.log("numstring before :  "+ numberbefor);
  })


  await test.step('choose a stop', async () => {

    //await mainFrame.locator('div[id="073a696ecb5a4191ab65142f9f6efdca"]').click();
   // idsSecond = await getID2(url,headers,data,ids,{page});
  // getIDstop(url1:string,headers1,data1,{page})
  var idstop:string;

  idstop=(await getIDstop(url,headers,data,{page})).toString();
  console.log("choseStop: "+idstop);
  //idstop="'"+idstop+"'";
  await mainFrame.locator(idstop).click();
  //await mainFrame.locator('div[id="d17549e09d1f46749ac0f5f73279f467"]').click();
  await page.waitForTimeout(6000);
  })


  await test.step('click Re-route Stop', async () => {
   
    await mainFrame.locator('text=Re-route Stop').click();
    await page.waitForTimeout(9000);
  })

  await test.step('choose a rout', async () => {

    await mainFrame.locator('div[id="shiftWrapperIdBO9976_To School"]').click();
    await page.waitForTimeout(11000);
  })


  await test.step('check if we added a stops', async () => {

   var numstring = (await mainFrame.locator('div[class="sc-bQduHL jjaLSj"]>div[class="sc-cmthru rCyVP"]').textContent()).toString();
   var numberafter:number=+numstring;
   await expect(numstring).toEqual("1");
  })

  await test.step('click save', async () => {

    await mainFrame.locator('text=SAVE').click();
    await page.waitForTimeout(16000);
  })

}); 




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Test 7:open the un-routed students lists Users should have access to a list of un-routed students.', async ({page}) => {

    const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
    
   await test.step('click Unassigned student list', async () => {
    const studentslist = await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d4-0-3-125"]');
    await studentslist.click();
    await mainFrame.locator('text="Without Stops"').waitFor();
    //await page.waitForTimeout(17000);
   });

   await test.step('check Unassigned Students', async () => {
    let unassigned = await mainFrame.locator('div[class="sc-faQXZc hPaZDa"]');

    await unassigned.isVisible();
    let result= await unassigned.innerText();
    expect(result).toEqual("Unassigned Students")

    const withoutStops= mainFrame.locator('text="Without Stops"').isVisible();
    expect(withoutStops).toBeTruthy();
   
    const withUnroutedStops = mainFrame.locator('text="With Unrouted Stops"').isVisible();
    expect(withUnroutedStops).toBeTruthy();

   });

   await test.step('close unrouted students list', async () => {
    await mainFrame.locator('div[class="sc-faQXZc hPaZDa"]>svg[class="voc-hub-MuiSvgIcon-root"]').click();
    //await page.waitForTimeout(5000);
   });

   await test.step('click plan view', async () => {
    await mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 

    
   // await page.waitForTimeout(8000);
   });

   await test.step('clic Unassigned student list', async () => {
    const studentslist2 = await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d4-0-3-125"]');
    await studentslist2.click();
    await mainFrame.locator('text="Without Stops"').waitFor();
    //await page.waitForTimeout(11000);
   });
 
   await test.step('check Unassigned Students in plan view', async () => {
    let unassigned = await mainFrame.locator('div[class="sc-faQXZc hPaZDa"]');

    unassigned = await mainFrame.locator('div[class="sc-faQXZc hPaZDa"]');
    await unassigned.isVisible();
    const result= await unassigned.innerText();
    expect(result).toEqual("Unassigned Students")

    const withoutStops= mainFrame.locator('text="Without Stops"').isVisible();
    expect(withoutStops).toBeTruthy();
   
    const withUnroutedStops = mainFrame.locator('text="With Unrouted Stops"').isVisible();
    expect(withUnroutedStops).toBeTruthy();
   });

   await test.step('close unrouted students list', async () => {
    await mainFrame.locator('div[class="sc-faQXZc hPaZDa"]>svg[class="voc-hub-MuiSvgIcon-root"]').click();
    //await page.waitForTimeout(3000);
   });

});






/////////////////////////////////////////////////////////////////////////
test('Test 25:Users should be able to manually adjust the planned time for a stop on any given route.', async ({page}) => {


  var url: string;
  var headers;
  var data ;
  url=  'https://int.us1.dev.ridewithvia.com/voc/live-view-be/trips'
  headers = {
    'authority':'int.us1.dev.ridewithvia.com',
    'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    'x-via-city-id':'297',
    'x-via-node-port-prefix':'300',
    'x-via-city-short-name':'nel',
    'sec-ch-ua-mobile':'?0',
    'authorization':'BYPASS_AUTH',
    //'authorization':'eyJraWQiOiJWSVg4MWR3ZGh4d09DYWVqV2hRTDlpeWRXQ1Z3Ymh3ZjNMRElpMkNhUVlBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJjdXN0b206cm9sZXMiOiJBZ2VudF9PcGVyYXRpb25zX1ZPQ0FkbWluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX202VTBxVUpTTSIsImNvZ25pdG86dXNlcm5hbWUiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJhdWQiOiIzb3ZsdjNiYWdncWsxMnRwYW12c3JyZWIwdiIsImV2ZW50X2lkIjoiNDhlY2Q4N2UtNmUxMi00YWM3LWJlYjItM2ZmZmUwMGZhMDUyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDQzMzE3OTksIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY0NDM5NTM4MSwiaWF0IjoxNjQ0MzkxNzgxLCJmYW1pbHlfbmFtZSI6IlZpYSIsImVtYWlsIjoiYWRtaW5AcmlkZXdpdGh2aWEuY29tIn0.oqczMRxIl-Wif3q5ApoVqsmLZE0iz419-N1la05tK_KWUVH7iXbspYwtMQ8lc5vuFQJbQkgH2wGaHErm8vn8x-yNqjDWvhk-opp3XRFSxGkiOcSt0f-0JMRFn9MFjqHWA2hMisUdMdDlQVr0l2_C-oJlZp1XCgGqORtQVlNRVYXHRoP6Q7VXIRrzs3s4tF7khpM359bgNNLJ2iQVUSFb0B2b1IRbuUffZVntrxvbchxp58e3t64ZVUzfvUsMadNbEH271w5lzt-7kvk8tWvvZ3mnBZ7fU8K9ofsuX_EnLja5TkfdcYd7KVM-vGFiyHi_2gVjSshUdT6Hb1H-dG4whg',
    'auth':'undefined',
    'content-type':'application/json',
    'accept':'application/json, text/plain, */*',
    'x-via-environment':'doenel',
    'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36',
    'x-via-service-provider-name':'doenel',
    'origin':'https://doenel-nel.voc.dev.ridewithvia.com',
    'sec-fetch-site':'same-site',
    'sec-fetch-mode':'cors',
    'sec-fetch-dest':'empty',
    'referer':'https://doenel-nel.voc.dev.ridewithvia.com/',
    'accept-language':'en-US,en;q=0.9'
}

 data ={"city_id":297,"city_short_name":"nel","tenant_id":"doenel","start_ts":2018840400,"end_ts":2018926799,"vendors":"[\"*\"]","serviceTags":"[\"*\"]","direction":"[\"*\"]"};

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  
   await test.step('lick plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
    //await page.waitForTimeout(6000);
   })

   await test.step('choose a nonEmptay route', async () => {

    //await mainFrame.locator('div[id="shiftWrapperIdQG7792_To School"]').click();
    var routid:string;
    //routid = getRouteName(url,headers,data,1);
    //getNONEmptyRouteName
    routid = await getNONEmptyRouteName(url,headers,data);
    console.log("routid: "+routid);
    await mainFrame.locator(routid).click();

    await page.waitForTimeout(5000);
   })


   await test.step('check if open the routr manifest(X)',async () => {

    var Xbutton = await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root"]>path[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]').isVisible();
    expect(Xbutton).toBeTruthy();
   })


  
   await test.step('hange the time for the first step',async () => {

    await mainFrame.locator('input[class="voc-hub-MuiInputBase-input voc-hub-MuiOutlinedInput-input"]').first().click();
    await mainFrame.locator('input[class="voc-hub-MuiInputBase-input voc-hub-MuiOutlinedInput-input"]').first().fill('07:45');
   })

   await test.step('check ()Time change: +10min',async () => {

    mainFrame.locator('div[class="sc-emjYpo jJOWRL"]').click();
    var time = mainFrame.locator('div[class="sc-emjYpo jJOWRL"]').isVisible();
    expect(time).toBeTruthy();
    await page.waitForTimeout(7000);
  
   })

 await test.step('change the time for the second step', async () => {

  await mainFrame.locator('input[class="voc-hub-MuiInputBase-input voc-hub-MuiOutlinedInput-input"]').last().click();
  await mainFrame.locator('input[class="voc-hub-MuiInputBase-input voc-hub-MuiOutlinedInput-input"]').last().fill('08:59');
  await page.waitForTimeout(7000);
 })


 await test.step('check ()Time change: +10min',async () => {

  mainFrame.locator('div[class="sc-emjYpo jJOWRL"]').last().click();
  var time = mainFrame.locator('div[class="sc-emjYpo jJOWRL"]').last().isVisible();
  expect(time).toBeTruthy();
  await page.waitForTimeout(3000);

 })


await test.step('check the option to save the change', async () => {

  var savebutton = await mainFrame.locator('text="SAVE"').isDisabled();
  await expect(savebutton).toBeFalsy();
  await page.waitForTimeout(3000);

})

}); 





/////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('Test 4:create new stop without address', async ({page}) => {

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  

 await test.step('lick plan view', async () => {

  mainFrame.locator('svg[color="#8C8C8C"]').click();
  await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 

 })
   

 await test.step('click threeDots Button',async () => {
  
  const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
  await threeDotsButton.click();
 // await mainFrame.locator('tex="Download Plan Manifest"').waitFor();
  //await page.waitForTimeout(5000);
 })
  

 await test.step('click createStop button',async () => {

  const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
 // await page.waitForTimeout(3000);
  await createStopBtn.click();
  await mainFrame.locator('text="Properties"').waitFor();
  //await page.waitForTimeout(5000);
 })


 await test.step('click School address', async () => {

  const schoollist = mainFrame.locator('text="School Name"');
  schoollist.click();
  //await page.waitForTimeout(4000);
 })

await test.step('choose school',async () => {

  const school = mainFrame.locator('text="P721K @ ROY CAMPANELLA OTC"');
  //await page.waitForTimeout(1000);
  await school.click();
  //await page.waitForTimeout(5000);
})

await test.step('click save button', async () => {

 const save=mainFrame.locator('div[class="sc-AUpyg dsnSVV"]');
 await save.click();
 //await page.waitForTimeout(5000);

})

await test.step('check if he did save', async () => {

  var stopAddressIsVisible = await mainFrame.locator('text="Stop address is mandatory to add a stop"').isVisible();
  expect(stopAddressIsVisible).toBeTruthy();
})

await test.step('Check the sentence(Create New Stop)', async () => {

  var sentenceCreateNew = await mainFrame.locator('div[class="sc-hZeNU eMYEmE"]').isVisible();
  expect(sentenceCreateNew).toBeTruthy();
})

}); 

///////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////

test('Test 1 Example:create a new stop', async ({page}) => {



  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  var newschoolname= "Lycée Camille Claudel";
  var numberstopsbefore;

  await test.step('lick plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
   // await page.waitForTimeout(6000);
   })

   await test.step('click threeDots Button',async () => {
  
    const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
    await threeDotsButton.click();
    //await page.waitForTimeout(5000);
   })
    
  
   await test.step('click createStop button',async () => {
  
    const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
    //await page.waitForTimeout(3000);
    await createStopBtn.click();
   // await page.waitForTimeout(5000);
   })


   await test.step('insert stop address', async () => {

    numberstopsbefore = await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
    await page.mouse.click(300,400);
    //await page.waitForTimeout(7000);
    await mainFrame.locator('text="SAVE"').waitFor();
   })

   await test.step('click school address', async () => {

   // await page.waitForTimeout(6000);
    const schoollist = mainFrame.locator('text="School Name"');
    await schoollist.click();
   })


   await test.step('choose school', async () => {
    const school = await mainFrame.locator('text="Lycée Camille Claudel"');
    //await page.waitForTimeout(1000);
    await school.click();
    await mainFrame.locator('text="Stop have to connect to school"').waitFor();
    await mainFrame.locator('text="SAVE"').waitFor();
    //await page.waitForTimeout(4000);
   })



   await test.step('click save', async () => {

    const savebutton = mainFrame.locator('div[class="sc-AUpyg dsnSVV"]');
    savebutton.click();
  //await page.waitForTimeout(22000);
   await mainFrame.locator('text="Properties"').waitFor();
  })


  await test.step('check if the Rout Stop Button is existed', async () => {

    var routeStopButton= mainFrame.locator('button[class="voc-hub-MuiButtonBase-root voc-hub-MuiButton-root fleet-prebooking-fe-jss276 fleet-prebooking-fe-jss274 voc-hub-MuiButton-contained"]').isVisible();
   expect(routeStopButton).toBeTruthy();   
  })


  await test.step('check if the stop added', async () => {

    await mainFrame.locator('text="New stop created."').waitFor();
    console.log("waitttttt");
    // await page.reload();
    // var t = await mainFrame.locator('svg[color="#8C8C8C"]');
    // await t.waitFor();
    // var r = await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
    // console.log("number of stops: "+r);
    // await page.waitForTimeout(2000);
    // var st = await mainFrame.locator('div[class="fleet-prebooking-fe-MuiAutocomplete-root fleet-prebooking-fe-MuiAutocomplete-hasPopupIcon"]').innerText();
    // console.log("stop address: "+st);
  });

/*

await test.step('check if the stop added', async () => {

  //click unrouted stops 
await page.waitForTimeout(3000);
await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();
//await mainFrame.locator('text="Unrouted Stops"').waitFor();
////////////////////////////////////////
//await page.waitForTimeout(5000);
const lastschoolname = await mainFrame.locator('div[class="sc-fxmata hkGtgV"]>div[class="sc-cIsjWt TWexk"]>div[class="sc-rzOft jxfYwB"]>div[class="sc-eIvgmF eCXYmw"]>p[class="sc-izfUZz djkzgO"]').first().innerText();
console.log("last: "+lastschoolname);
console.log(lastschoolname);
console.log("new: ", newschoolname);
var result = lastschoolname.localeCompare(newschoolname);
result +=0 ;
console.log("result:  "+result)
expect(result).toEqual(0);

})
*/

await test.step('close Unrouted Stops List',async () => {

  await mainFrame.locator('path[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]').click();
})

//////////////////////////////////////////////////////////////////


await test.step('click Map View', async () => {

  await mainFrame.locator('svg[color="#00BAEE"]').click();
})

await test.step('click threeDots Button',async () => {
  
  const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
  await threeDotsButton.click();
  await page.waitForTimeout(5000);
 })
  

 await test.step('click createStop button',async () => {

  const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
  //await page.waitForTimeout(3000);
  await createStopBtn.click();
 // await page.waitForTimeout(5000);
 })


 await test.step('insert stop address', async () => {

  await page.mouse.click(300,400);
 // await page.waitForTimeout(7000);
 await mainFrame.locator('text="SAVE"').waitFor();
 })

 await test.step('click school address', async () => {

  const schoollist = mainFrame.locator('text="School Name"');
  await schoollist.click();
 })


 await test.step('choose school', async () => {
  const school = await mainFrame.locator('text="556688"');
  await school.click();
 })



 await test.step('click save', async () => {

  const savebutton = mainFrame.locator('div[class="sc-AUpyg dsnSVV"]');
  savebutton.click();
 // await page.waitForTimeout(27000);
})


await test.step('check if the Rout Stop Button is existed', async () => {

  var routeStopButton= mainFrame.locator('button[class="voc-hub-MuiButtonBase-root voc-hub-MuiButton-root fleet-prebooking-fe-jss276 fleet-prebooking-fe-jss274 voc-hub-MuiButton-contained"]').isVisible();
 expect(routeStopButton).toBeTruthy();   
})

await test.step('check if the stop added', async () => {

  await mainFrame.locator('text="New stop created."').waitFor();
  console.log("waitttttt");
  // await page.reload();
  // var t = await mainFrame.locator('svg[color="#8C8C8C"]');
  // await t.waitFor();
  // var r = await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
  // console.log("number of stops: "+r);
  // await page.waitForTimeout(2000);
  // var st = await mainFrame.locator('div[class="fleet-prebooking-fe-MuiAutocomplete-root fleet-prebooking-fe-MuiAutocomplete-hasPopupIcon"]').innerText();
  // console.log("stop address: "+st);
});
/*
await test.step('check if the stop added', async () => {
  
newschoolname = "556688";
//click unrouted stops 
await page.waitForTimeout(9000);
await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();
await page.waitForTimeout(5000);
const lastschoolname = await mainFrame.locator('div[class="sc-fxmata hkGtgV"]>div[class="sc-cIsjWt TWexk"]>div[class="sc-rzOft jxfYwB"]>div[class="sc-eIvgmF eCXYmw"]>p[class="sc-izfUZz djkzgO"]').first().innerText();
console.log("last: "+lastschoolname);
console.log(lastschoolname);
console.log("new: ", newschoolname);
var result = lastschoolname.localeCompare(newschoolname);
result +=0 ;
console.log("result:  "+result)
expect(result).toEqual(0);

})
*/


});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('Test 9:From the timeline view, users should be able to select a student, then enter the process of selecting a stop for them.', async ({page}) => {


  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');


  await test.step('click Unassigned student list', async () => {
    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d4-0-3-125"]').click();
    await mainFrame.locator('text="Without Stops"').waitFor();
   });



   await test.step('open without stops Students list', async () => {

    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root"]>path[d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"]').first().click();
  });

  
  await test.step('select a student', async () => {

    await mainFrame.locator('span[class="voc-hub-MuiButton-label"]').nth(2).click();
  });


  await test.step('select Manually', async () => {

    await mainFrame.locator('text="Manually"').click();
  })

 await test.step('click Next',  async () => {

  await mainFrame.locator('text="Next"').click();
  await mainFrame.locator('text="Unrouted Stops"').waitFor();
  //await page.waitForTimeout(4000);
 });

 await test.step('choose a step', async () => {
  //await mainFrame.locator('div[style="width: 32px; height: 32px; overflow: hidden; position: absolute; cursor: pointer; touch-action: none; left: -50px; top: -102px; z-index: 1000;"]').click();
 // await mainFrame.locator('div[style="width: 32px; height: 32px; overflow: hidden; position: absolute; cursor: pointer; touch-action: none; left: -144px; top: -43px; z-index: 1000;"]').click();
 await mainFrame.locator('div[style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"]>div').nth(5).dblclick();
  //await page.waitForTimeout(4000);
  await mainFrame.locator('text="SAVE"').waitFor();
});
await test.step('click SAVE', async () => {

  await mainFrame.locator('text="SAVE"').click();
  await mainFrame.locator('text="Student(s) assigned"').waitFor();
 // await page.waitForTimeout(4000);
 });

 await test.step('click Unassigned student list', async () => {
  await page.reload();
  await mainFrame.locator('svg[color="#8C8C8C"]').waitFor();
  //await page.waitForTimeout(4000);
  const studentslist = await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d4-0-3-125"]').click();
  await mainFrame.locator('text="Without Stops"').waitFor();
 });

 await test.step('click with Unrouted stops', async () => {

  await mainFrame.locator('text="With Unrouted Stops"').click();

});

await test.step('check if the student is exist in the list', async () => {

  const student2 = page.locator('text="Firstname31 L"').isVisible();  
  await expect(student2).toBeTruthy();
});

}); 



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


test('Test 3:create new stop without school name', async ({page}) => {

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  

 await test.step('lick plan view', async () => {

  mainFrame.locator('svg[color="#8C8C8C"]').click();
  await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 

 })
   

 await test.step('click threeDots Button',async () => {
  
  const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
  await threeDotsButton.click();
 // await mainFrame.locator('tex="Download Plan Manifest"').waitFor();
  //await page.waitForTimeout(5000);
 })
  

 await test.step('click createStop button',async () => {

  const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
  await createStopBtn.click();
  await mainFrame.locator('text="Properties"').waitFor();
 })


//  await test.step('click School address', async () => {

//   const schoollist = mainFrame.locator('text="School Name"');
//   schoollist.click();
//  })

 await test.step('insert stop address', async () => {

  await page.mouse.click(300,400);
 // await page.waitForTimeout(7000);
 await mainFrame.locator('text="SAVE"').waitFor();
 })

// await test.step('choose school',async () => {

//   const school = mainFrame.locator('text="P721K @ ROY CAMPANELLA OTC"');
//   await school.click();
// })

await test.step('click save button', async () => {

 const save=mainFrame.locator('div[class="sc-AUpyg dsnSVV"]');
 await save.click();
})

await test.step('check if he did save', async () => {

  var stopAddressIsVisible = await mainFrame.locator('text="Stop have to connect to school"').isVisible();
  expect(stopAddressIsVisible).toBeTruthy();
})

await test.step('Check the sentence(Create New Stop)', async () => {

  var sentenceCreateNew = await mainFrame.locator('div[class="sc-hZeNU eMYEmE"]').isVisible();
  expect(sentenceCreateNew).toBeTruthy();
})

}); 


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('Test 5:When creating stops, the stop should automatically receive a stop id.', async ({page}) => {

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  var newschoolname= "Lycée Camille Claudel";
  var numberstopsbefore;

  await test.step('lick plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
   // await page.waitForTimeout(6000);
   })

   await test.step('click threeDots Button',async () => {
  
    const threeDotsButton =mainFrame.locator('span[role="button"]>svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d1-0-3-114"]');
    await threeDotsButton.click();
    //await page.waitForTimeout(5000);
   })
    
  
   await test.step('click createStop button',async () => {
  
    const createStopBtn = mainFrame.locator('ul[class="voc-hub-MuiList-root voc-hub-MuiMenu-list ViaMenu-menuList-0-3-116 voc-hub-MuiList-padding"]>li[aria-label="Create New Stop"]');
    //await page.waitForTimeout(3000);
    await createStopBtn.click();
   // await page.waitForTimeout(5000);
   })


   await test.step('insert stop address', async () => {

    numberstopsbefore = await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
    await page.mouse.click(300,400);
    //await page.waitForTimeout(7000);
    await mainFrame.locator('text="SAVE"').waitFor();
   })

   await test.step('click school address', async () => {

   // await page.waitForTimeout(6000);
    const schoollist = mainFrame.locator('text="School Name"');
    await schoollist.click();
   })


   await test.step('choose school', async () => {
    const school = await mainFrame.locator('text="Lycée Camille Claudel"');
    //await page.waitForTimeout(1000);
    await school.click();
    await mainFrame.locator('text="Stop have to connect to school"').waitFor();
    await mainFrame.locator('text="SAVE"').waitFor();
    //await page.waitForTimeout(4000);
   })



   await test.step('click save', async () => {

    const savebutton = mainFrame.locator('div[class="sc-AUpyg dsnSVV"]');
    savebutton.click();
  //await page.waitForTimeout(22000);
   await mainFrame.locator('text="Properties"').waitFor();
  })
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



test('Test 8:The un-routed student list is divided to separate students that are assigned to a stop and students that are not yet assigned to a stop.', async ({page}) => {


  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
    
  await test.step('click Unassigned student list', async () => {
   const studentslist = await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d4-0-3-125"]');
   await studentslist.click();
   await mainFrame.locator('text="Without Stops"').waitFor();
   //await page.waitForTimeout(17000);
  });

  await test.step('check Unassigned Students', async () => {
   let unassigned = await mainFrame.locator('div[class="sc-faQXZc hPaZDa"]');

   await unassigned.isVisible();
   let result= await unassigned.innerText();
   expect(result).toEqual("Unassigned Students")


   const withoutStops= mainFrame.locator('text="Without Stops"').isVisible();
   expect(withoutStops).toBeTruthy();
   await mainFrame.locator('text="Without Stops"').click();
   await mainFrame.locator('text="Without Stops"').click();
  
   const withUnroutedStops = mainFrame.locator('text="With Unrouted Stops"').isVisible();
   expect(withUnroutedStops).toBeTruthy();

   await mainFrame.locator('text="With Unrouted Stops"').click();
   await mainFrame.locator('text="With Unrouted Stops"').click();

  });

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


test('Test 11:', async ({page}) => {

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');


  await test.step('click Unassigned student list', async () => {
    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d4-0-3-125"]').click();
    await mainFrame.locator('text="Without Stops"').waitFor();
   });



   await test.step('open without stops Students list', async () => {

    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root"]>path[d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"]').first().click();
  });

  
  await test.step('select a student', async () => {

    await mainFrame.locator('span[class="voc-hub-MuiButton-label"]').nth(2).click();
  });


  await test.step('select Manually', async () => {

    await mainFrame.locator('text="Manually"').click();
  })

 await test.step('click Next',  async () => {

  await mainFrame.locator('text="Next"').click();
  await mainFrame.locator('text="Unrouted Stops"').waitFor();
 });

 await test.step('choose a step', async () => {
   await mainFrame.locator('div[class="sc-fxMfqs onCkY"]').nth(1).click();
  await mainFrame.locator('text="SAVE"').waitFor();
});
await test.step('click SAVE', async () => {

  await mainFrame.locator('text="SAVE"').click();
  await mainFrame.locator('text="Student(s) assigned"').waitFor();
 });

 await test.step('check if added the student',async () => {

  // await mainFrame.locator('text=Student(s) assigned').waitFor();
  const isSave= mainFrame.locator('text=Student(s) assigned').isVisible();
  expect(isSave).toBeTruthy();
 });

}); 



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


test('Test 12:After selecting a stop for a student, users should be prompted to save or cancel the potential change.', async ({page}) => {

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');


  await test.step('click Unassigned student list', async () => {
    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d4-0-3-125"]').click();
    await mainFrame.locator('text="Without Stops"').waitFor();
   });



   await test.step('open without stops Students list', async () => {

    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root"]>path[d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"]').first().click();
  });

  
  await test.step('select a student', async () => {

    await mainFrame.locator('span[class="voc-hub-MuiButton-label"]').nth(2).click();
  });


  await test.step('select Manually', async () => {

    await mainFrame.locator('text="Manually"').click();
  })

 await test.step('click Next',  async () => {

  await mainFrame.locator('text="Next"').click();
  await mainFrame.locator('text="Unrouted Stops"').waitFor();
 });

 await test.step('choose a step', async () => {
   await mainFrame.locator('div[class="sc-fxMfqs onCkY"]').nth(1).click();
  await mainFrame.locator('text="SAVE"').waitFor();
});


 await test.step('check the Cancel and Save Button',async () => {

  var cancel =  await mainFrame.locator('text="Cancel"').isEnabled();
  expect(cancel).toBeTruthy();

  var save =  await mainFrame.locator('text="SAVE"').isEnabled();
  expect(save).toBeTruthy();

 });

}); 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('Test 14: Users should have access to a list of un-routed stops. ', async ({page}) => {


  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');


  await test.step('open Unrouted Stops List', async () => {

    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();
   // await page.waitForTimeout(6000);

  
  });

await test.step('red unrouted stops button', async () =>{

 var redButton =  await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).isVisible();
  var r = mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
  console.log("???: "+(await r).toString());
  expect(redButton).toBeTruthy()
  //await page.waitForTimeout(6000);
})

await test.step('check if see "Unrouted Stops"', async () => {

 var UnroutedStops =  await mainFrame.locator('div[class="sc-hokXgN iJJrDy"]').isVisible();
 expect(UnroutedStops).toBeTruthy();

})

await test.step('exist from the list', async () => {
  
  //await mainFrame.locator('path[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]').click();
  await mainFrame.locator('div[class="sc-hokXgN iJJrDy"]>svg[class="voc-hub-MuiSvgIcon-root"]').click();

})


  await test.step('lick plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
   })


   await test.step('open Unrouted Stops List', async () => {

    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();
    //await page.waitForTimeout(6000);  
  });

await test.step('red unrouted stops button', async () =>{

 var redButton =  await mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).isVisible();
  var r = mainFrame.locator('div[class="sc-gzOgki IXqxM"]').nth(1).innerText();
  console.log("???: "+(await r).toString());
  expect(redButton).toBeTruthy()
//await page.waitForTimeout(6000);
})

await test.step('check if see "Unrouted Stops"', async () => {

 var UnroutedStops =  await mainFrame.locator('div[class="sc-hokXgN iJJrDy"]').isVisible();
 expect(UnroutedStops).toBeTruthy();

})



})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// can't to unassign ride
test('Test 16:users should be able to view a route, select a stop and individually un-assign students from the stop. These students should return to the un-assigned student list', async ({page}) => {

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  var url2: string;
  var headers;
  var data ;
  var  ids :string;


  await test.step('lick plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
   })


   await test.step('chose a nonEmpty Stop', async () => {
  
    url2=  'https://int.us1.dev.ridewithvia.com/voc/live-view-be/trips'
   headers = {
     'authority':'int.us1.dev.ridewithvia.com',
     'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
     'x-via-city-id':'297',
     'x-via-node-port-prefix':'300',
     'x-via-city-short-name':'nel',
     'sec-ch-ua-mobile':'?0',
     'authorization':'BYPASS_AUTH',
     //'authorization':'eyJraWQiOiJWSVg4MWR3ZGh4d09DYWVqV2hRTDlpeWRXQ1Z3Ymh3ZjNMRElpMkNhUVlBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJjdXN0b206cm9sZXMiOiJBZ2VudF9PcGVyYXRpb25zX1ZPQ0FkbWluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX202VTBxVUpTTSIsImNvZ25pdG86dXNlcm5hbWUiOiJjYmM4YmE2Mi1kODA5LTRlYzAtOThhZC04ZDczYTVjNTFiMzIiLCJhdWQiOiIzb3ZsdjNiYWdncWsxMnRwYW12c3JyZWIwdiIsImV2ZW50X2lkIjoiNDhlY2Q4N2UtNmUxMi00YWM3LWJlYjItM2ZmZmUwMGZhMDUyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDQzMzE3OTksIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY0NDM5NTM4MSwiaWF0IjoxNjQ0MzkxNzgxLCJmYW1pbHlfbmFtZSI6IlZpYSIsImVtYWlsIjoiYWRtaW5AcmlkZXdpdGh2aWEuY29tIn0.oqczMRxIl-Wif3q5ApoVqsmLZE0iz419-N1la05tK_KWUVH7iXbspYwtMQ8lc5vuFQJbQkgH2wGaHErm8vn8x-yNqjDWvhk-opp3XRFSxGkiOcSt0f-0JMRFn9MFjqHWA2hMisUdMdDlQVr0l2_C-oJlZp1XCgGqORtQVlNRVYXHRoP6Q7VXIRrzs3s4tF7khpM359bgNNLJ2iQVUSFb0B2b1IRbuUffZVntrxvbchxp58e3t64ZVUzfvUsMadNbEH271w5lzt-7kvk8tWvvZ3mnBZ7fU8K9ofsuX_EnLja5TkfdcYd7KVM-vGFiyHi_2gVjSshUdT6Hb1H-dG4whg',
     'auth':'undefined',
     'content-type':'application/json',
     'accept':'application/json, text/plain, */*',
     'x-via-environment':'doenel',
     'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36',
     'x-via-service-provider-name':'doenel',
     'origin':'https://doenel-nel.voc.dev.ridewithvia.com',
     'sec-fetch-site':'same-site',
     'sec-fetch-mode':'cors',
     'sec-fetch-dest':'empty',
     'referer':'https://doenel-nel.voc.dev.ridewithvia.com/',
     'accept-language':'en-US,en;q=0.9'
 }
 
  data ={"city_id":297,"city_short_name":"nel","tenant_id":"doenel","start_ts":2018840400,"end_ts":2018926799,"vendors":"[\"*\"]","serviceTags":"[\"*\"]","direction":"[\"*\"]"};
 
    ids=await getID(url2,headers,data);
    await mainFrame.locator(ids).click();
    var t = await mainFrame.locator('text="Properties"');
    await t.waitFor();

    var pickups = await mainFrame.locator('a[class="sc-jbWsrJ fDjFwj"]').nth(0).innerText();
    console.log("P= "+pickups);
  
    var dropoffs = await mainFrame.locator('a[class="sc-jbWsrJ fDjFwj"]').nth(1).innerText();
    console.log("d= "+dropoffs);

    // for(var i =0 ; i <2 ; i++)
    // {
     var studentName =  await mainFrame.locator('div[class="sc-hPeUyl gPxevT"]').nth(1).innerText();
     console.log("NAME: "+studentName);
      await mainFrame.locator('path[d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"]').nth(1).click();
      await mainFrame.locator('text="Unassign ride"').click();
      await mainFrame.locator('text="Next"').click();
      
    //   await mainFrame.locator('text="UNROUTE"').click();
    

    // }
    await page.waitForTimeout(8000);
  });



});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

test('Test 19:From the timeline, users should be able to select a stop and add it to a route. ', async ({page}) => {

  const mainFrame = await page.frameLocator('iframe[title="route-editor"]');
  var stopName:string;

  await test.step('click plan view', async () => {

    mainFrame.locator('svg[color="#8C8C8C"]').click();
    await mainFrame.locator('span[class="fleet-prebooking-fe-MuiFab-label"]').nth(0).waitFor(); 
    await mainFrame.locator('div[class="sc-iBEsjs hiTBNi"]').nth(0).waitFor();
    //await page.waitForTimeout(9000);
   })


   await test.step('open Unrouted Stops List', async () => {

    await mainFrame.locator('svg[class="voc-hub-MuiSvgIcon-root ViaIcon-icon-0-3-112 ViaIcon-icon-d3-0-3-124"]').click();
    await mainFrame.locator('div[class="sc-boCWhm cQALYo"]').waitFor();
     stopName = await mainFrame .locator('div[class="sc-fxMfqs onCkY"]').nth(0).innerText();
    console.log("stop: "+stopName.toString());

  //  await page.waitForTimeout(9000);
  });
//span[class="voc-hub-MuiButton-label"]
//span[class="fleet-prebooking-fe-MuiTouchRipple-root"]
await test.step('clicl ROUTE', async () => {

  await mainFrame.locator('span[class="fleet-prebooking-fe-MuiTouchRipple-root"]').nth(2).click();
  //await page.waitForTimeout(3000);
})
//Manually

await test.step('click Manually', async () => {
  
  await mainFrame.locator('text="Manually"').click();
  //await page.waitForTimeout(3000);
})

await test.step('chosse a route', async () => {

 var x:number;
 x = getRandomArbitrary(10,20);

 var x1:number;
 var y1:number;

 x1=getRandomArbitrary(700,900);;
 y1 = 300;

 console.log("x: "+(x1-x));
 console.log("y: "+(y1));
await page.mouse.click(x1-x,y1);
//await page.waitForTimeout(12000);
})


await test.step('check if open the route manifest', async () => {

  await mainFrame.locator('text="SAVE"').waitFor();
})

await test.step('click SAVE', async () => {

await mainFrame.locator('text="SAVE"').click();
 await mainFrame.locator('text="Stop(s) routed"').waitFor();
})

await test.step('check if added the step', async () => {

  var stops= await mainFrame.locator('text="Stops"').isVisible();
  expect(stops).toBeTruthy();
  stopName= "text"+"="+'"'+stopName+'"';
  var sName= await mainFrame.locator(stopName).nth(0).isVisible();
  expect(sName).toBeTruthy();

})


});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


});
     

































