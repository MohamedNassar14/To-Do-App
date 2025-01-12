const fullName = document.getElementById('name');
const department = document.getElementById('department');
const age = document.getElementById('age');
const mobile = document.getElementById('mobile');
const displayInputsBtn = document.getElementById('display-inputs');
const lightBox = document.querySelector('.employees-inputs');
const addEmployee = document.getElementById('add-employee');
const tBody = document.getElementById('tbody');
const cancelBtn = document.getElementById('btn-cancel');
const searchInput = document.getElementById('search-input');
const update = document.getElementById('update-employee');
const toastBox = document.getElementById('toast-box');
const error = document.getElementById('error');

let employeesData = [];
let currentIndex;
//return data from local storage if exist
if(localStorage.getItem('employees') != null)
{
    employeesData = JSON.parse(localStorage.getItem('employees'));
    displayEmployeeData(employeesData);
}
//To show inputs
displayInputsBtn.addEventListener('click', ()=>
{
    lightBox.classList.remove('d-none');
    addEmployee.classList.remove('d-none');
    update.classList.add('d-none');
});
//To add new employee
function addNewEmployee()
{
    const employee = 
    {
        employeeName: fullName.value,
        employeeDept: department.value,
        employeeAge: age.value,
        employeeMobile: mobile.value,
    }
    if(validationForName() && validationForDepartment() && validationForAge() && validationForMobile())
    {
        employeesData.push(employee);
        localStorage.setItem('employees', JSON.stringify(employeesData));
        displayEmployeeData(employeesData);
        clearInputs();
        showToast(`<i class="fa-solid fa-circle-check"></i> Successfully Added`);
    }
    else
    {
        validationForName();
        validationForDepartment();
        validationForAge();
        validationForMobile();
        showToast(`<i class="fa-solid fa-circle-exclamation"></i> Invalid Data`);
    }
    
}
//Click add button to add employee
addEmployee.addEventListener('click', ()=>
{
    addNewEmployee();
})
//Display all employees data
function displayEmployeeData(fullData)
{
    let employeeData = "";
    for(let i = 0; i < fullData.length; i++)
    {
        employeeData+=
        `<tr>
            <td>${i+1}</td> 
            <td>${fullData[i].employeeName}</td>
            <td>${fullData[i].employeeDept}</td>
            <td>${fullData[i].employeeAge}</td>
            <td>${fullData[i].employeeMobile}</td>
            <td> <i class="fas fa-edit text-warning" onClick="getEmployeeData(${i})"></i> </td>
            <td> <i class="fa-solid fa-trash text-danger" onClick="deleteEmployee(${i})"></i> </td>
         </tr>
        `
    }
    tBody.innerHTML = employeeData;
}
//Clear inputs
function clearInputs(flag)
{
    fullName.value = flag? flag.employeeName : "";
    department.value = flag? flag.employeeDept : "";
    age.value = flag? flag.employeeAge : "";
    mobile.value = flag? flag.employeeMobile : "";
    fullName.classList.remove("is-valid", "is-invalid");
    department.classList.remove("is-valid", "is-invalid");
    age.classList.remove("is-valid", "is-invalid");
    mobile.classList.remove("is-valid", "is-invalid");
    setValid(fullName, ``);
    setValid(department, ``);
    setValid(age, ``);
    setValid(mobile, ``);
}
//Close light box
cancelBtn.addEventListener('click', ()=>
{
    lightBox.classList.add('d-none');
    clearInputs();
})
//Search for get employee
function searchForGetEmployee(term) 
{
    const result = employeesData.filter(employee => employee.employeeName.toLowerCase().includes(term.toLowerCase()));
    displayEmployeeData(result);
}
//Write a letter to search
searchInput.addEventListener('input', (e)=>{
    searchForGetEmployee(e.target.value);
});
//Delete employee from employees data
function deleteEmployee(index)
{
    employeesData.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employeesData));
    displayEmployeeData(employeesData);
    showToast(`<i class="fa-solid fa-circle-check"></i> Successfully Remove`);
} 
//Get employee data to update
function getEmployeeData(index)
{
    lightBox.classList.remove('d-none');
    addEmployee.classList.add('d-none');
    update.classList.remove('d-none');
    clearInputs(employeesData[index]);
    currentIndex = index;
}
//Update employee
function updateEmployee()
{
    let employeeAfterUpdate = 
    {
        employeeName: fullName.value,
        employeeDept: department.value,
        employeeAge: age.value,
        employeeMobile: mobile.value,
    }
    if(validationForName() && validationForDepartment() && validationForAge() && validationForMobile())
    {
       employeesData[currentIndex] = employeeAfterUpdate;
       localStorage.setItem('employees', JSON.stringify(employeesData));
       displayEmployeeData(employeesData);
       clearInputs();
       showToast(`<i class="fa-solid fa-circle-check"></i> Successfully Updated`);
    }
    else
    {
        validationForName();
        validationForDepartment();
        validationForAge();
        validationForMobile();
        showToast(`<i class="fa-solid fa-circle-exclamation"></i> Invalid Updated`);
    }
}
//Click to confirm update
update.addEventListener('click', ()=>
{
    updateEmployee();
});
//Validation for full Name
function validationForName()
{
    let validName = /^[A-Z][a-z]+$/;
    if(validName.test(fullName.value))
    {
      setValid(fullName, ``);
      fullName.classList.remove('is-invalid');
      fullName.classList.add('is-valid');
      return true;
    }
    else
    {
      setError(fullName, 'First name start with upper Case');
      fullName.classList.add('is-invalid');
      return false;
    }
}
//Validation for department
function validationForDepartment()
{
    let validDepartment = /^(IT|IS|CS)$/;
    if(validDepartment.test(department.value))
    {
        setValid(department, ``);
      department.classList.remove('is-invalid');
      department.classList.add('is-valid');
      return true;
    }
    else
    {
        setError(department, `Department must be IT or CS or IS`);
      department.classList.add('is-invalid');
      return false;
    }
}
//Validation for age
function validationForAge()
{
    let validAge = /^([2-7][0-9]|80)$/;
    if(validAge.test(age.value))
    {
      setValid(age, ``);
      age.classList.remove('is-invalid');
      age.classList.add('is-valid');
      return true;
    }
    else
    {
        setError(age, `Age in range from 20 to 80`);
      age.classList.add('is-invalid');
      return false;
    }
}
//Validation for mobile
function validationForMobile()
{
    let validMobile = /^01[0125][0-9]{8}$/;
    if(validMobile.test(mobile.value))
    {
      setValid(mobile, ``);
      mobile.classList.remove('is-invalid');
      mobile.classList.add('is-valid');
      return true;
    }
    else
    {
      setError(mobile, `Mobile number in egyptian`);
      mobile.classList.add('is-invalid');
      return false;
    }
}
//this functions will change the color of input directly when blur the input
fullName.addEventListener('blur', ()=>
{
    validationForName();
})
department.addEventListener('blur', ()=>
{
    validationForDepartment();
})
age.addEventListener('blur', ()=>
{
    validationForAge();
})
mobile.addEventListener('blur', ()=>
{
    validationForMobile();
})
// Alert message to user
function showToast(msg)
{
    let toast = document.createElement(`div`);
    toast.classList.add(`toaster`);
    toast.innerHTML = msg;
    toastBox.appendChild(toast);
    if(msg.includes(`Invalid`))
    {
        toast.classList.add(`invalid`);
    }
    setTimeout(() => toast.remove(), 3000);
}
function setError(ele, msg)
{
   const errorDisplay = ele.parentElement.querySelector(`.error`);
   errorDisplay.innerText = msg;
}
function setValid(ele, msg)
{
   const errorDisplay = ele.parentElement.querySelector(`.error`);
   errorDisplay.innerText = msg;
}
//this functions will show validation of input directly when keyup the input
fullName.addEventListener('keyup', ()=>
{
    validationForName();
})
department.addEventListener('keyup', ()=>
{
    validationForDepartment();
})
age.addEventListener('keyup', ()=>
{
    validationForAge();
})
mobile.addEventListener('keyup', ()=>
{
     validationForMobile();
})