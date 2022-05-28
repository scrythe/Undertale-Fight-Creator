import Bone from './bone';
import { BoneData } from './interfaces';

class BoneWave {
  private bones: Bone[];

  constructor(bonesData: BoneData[]) {
    this.bones = this.getBones(bonesData);
  }

  private getBones(boneData: BoneData[]) {
    const bones: Bone[] = [];
    boneData.forEach((boneData) => {
      const bone = new Bone(boneData);
      bones.push(bone);
    });
    return bones;
  }

  update() {
    this.bones.forEach((bone) => {
      bone.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.bones.forEach((bone) => {
      bone.draw(ctx);
    });
  }
}

export default BoneWave;
