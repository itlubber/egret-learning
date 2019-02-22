class LabelTag extends eui.Component implements eui.UIComponent {

	public label_title: eui.Label;
	public label_value: eui.Label;


	public constructor() {
		super();
		this.skinName = 'LabelTagSkin'
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();	
	}

}