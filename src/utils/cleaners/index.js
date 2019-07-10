const cleanCombinedData = res => {
  return res.reduce((acc, palette) => {
    const { project_id, project_name, palette_id, palette_name } = palette;
    const project = acc.find(proj => proj.id === project_id) || null;
    const paletteData = palette_id ? [{
      id: palette_id,
      name: palette_name,
      color_1: palette.color_1,
      color_2: palette.color_2,
      color_3: palette.color_3,
      color_4: palette.color_4,
      color_5: palette.color_5
    }] : [];

    if (!project) {
      acc.push({ id: project_id, name: project_name, palettes: paletteData });
    } else if (project) {
      project.palettes.push(paletteData[0]);
      project.palettes.sort((a, b) => a.id - b.id);
    }

    return acc;
  }, []);
}

export default cleanCombinedData;