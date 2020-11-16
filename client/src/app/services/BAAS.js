const DOMAIN = 'https://jarnevs.github.io/pgm-website-baas';

class BAAS {
  static getAbout = async () => {
    const response = await fetch(`${DOMAIN}/data/opleiding/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData,
    };
  }

  static getTechnologies = async () => {
    const response = await fetch(`${DOMAIN}/data/technologie/index.json`);
    const jsonData = await response.json();
    return jsonData;
  }

  static getPosts = async () => {
    const response = await fetch(`${DOMAIN}/data/blog/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData,
    };
  }

  static getPostsWithoutCurrent = async (id) => {
    const response = await fetch(`${DOMAIN}/data/blog/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData.filter(post => post.id !== id),
    };
  }

  static getPost = async (id) => {
    const response = await fetch(`${DOMAIN}/data/blog/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData.find(post => post.id === id),
    };
  }

  static getStudents = async () => {
    const response = await fetch(`${DOMAIN}/data/studenten/index.json`);
    const jsonData = await response.json();
    return jsonData.records;
  }

  static getStudent = async (id) => {
    const response = await fetch(`${DOMAIN}/data/studenten/index.json`);
    const jsonData = await response.json();
    return jsonData.records.find(student => student.id === id);
  }

  static getCases = async () => {
    const response = await fetch(`${DOMAIN}/data/cases/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData,
    };
  }

  static getCasesByCourse = async (course) => {
    const response = await fetch(`${DOMAIN}/data/cases/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData.filter(project => project.course === course),
    };
  }

  static getCasesWithoutCurrent = async (id) => {
    const response = await fetch(`${DOMAIN}/data/cases/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData.filter(project => project.id !== id),
    };
  }

  static getCase = async (id) => {
    const response = await fetch(`${DOMAIN}/data/cases/index.json`);
    const jsonData = await response.json();

    return {
      domain: DOMAIN,
      data: jsonData.find(project => project.id === id),
    };
  }

  static getTeam = async () => {
    const response = await fetch(`${DOMAIN}/data/docenten/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData,
    };
  }

  static getContacts = async () => {
    const response = await fetch(`${DOMAIN}/data/docenten/index.json`);
    const jsonData = await response.json();
    return {
      domain: DOMAIN,
      data: jsonData.filter(value => value.importantContact),
    };
  }
}

export default BAAS;
