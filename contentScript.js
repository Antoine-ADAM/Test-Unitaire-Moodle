var listDebugExten = document.getElementById("responseform").querySelectorAll("table.coderunner-test-results");
var idTempoDebugExten=0;
function copyDebugPythonExten(id){
    var element=listDebugExten[id];
    var code = getDebugPythonExten(element);
    console.log(code);
    idTempoDebugExten=id;
    navigator.clipboard.writeText(code).then(function() {
        const element=listDebugExten[idTempoDebugExten].parentNode.children[1];
        element.textContent="Copiés !";
        element.classList="btn btn-dark";
        setTimeout(function(element){
            element.textContent="Copier les tests";
            element.classList="btn btn-primary";
        },2000,element);
      }, function() {
        const element=listDebugExten[idTempoDebugExten].parentNode.children[1];
        element.textContent="Il y a un problème de permission !";
        element.classList="btn btn-warning";
        setTimeout(function(element){
            element.textContent="Copier les tests";
            element.classList="btn btn-primary";
        },2000,element);
      });
}
for (let i = 0; i < listDebugExten.length; i++) {
    const element = listDebugExten[i];
    var b=document.createElement("button");
    b.onclick=new Function("copyDebugPythonExten("+i+");");
    b.textContent="Copier les tests";
    b.classList="btn btn-primary mb-2";
    b.type="button";
    element.after(b);
    element.setAttribute("style","margin-bottom:0;")
}

function getDebugPythonExten(element){
    var lignes = element.children[1].children;
    var allTest="";
    var title="";
    for (let ii = 0; ii < lignes.length; ii++) {
        const e = lignes[ii].children[2].children[0].textContent.trim().split(" -> ",2);
        if(title==""){
            var t=e[0].match("^([^(]+)");
            if(t!=null && t.length > 0){
                title=t[0];
            }
        }
        allTest+='print("[OK]'+e[0]+' -> '+e[1]+'" if '+e[0]+' == '+e[1]+' else "[ERROR]'+e[0]+' -> " + str('+e[0]+') + "\\n'+' '.repeat(8+e[0].length)+'<> '+e[1]+'")\n';
    }
    return 'print("--------------------=============={ '+title+' }==============--------------------")\n'+allTest;
}